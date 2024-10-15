import { Global, Logger, Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import * as main_models from './models/knowledge/index';
import * as process from 'node:process';
import { databaseProviders } from './database.provider';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...getDefaultSequelizeConfig(
        process.env.DATABASE_URI,
        main_models as any,
      ),
    }),
    SequelizeModule.forFeature(
      Object.keys(main_models).map((prop) => main_models[prop]),
    ),
  ],
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {}

function getDefaultSequelizeConfig(
  uri: string,
  models: Record<string, string> = {},
): SequelizeModuleOptions {
  return {
    uri,
    dialect: 'postgres',
    synchronize: false,
    benchmark: false,
    models: Object.keys(models).map((prop) => models[prop]),
    logging: false,
    hooks: {
      beforeInit() {
        Logger.log(
          '[SequelizeModule.forRoot:connecting to]:',
          process.env.DATABASE_URI,
        );
      },
    },
    pool: {
      max: 10, // Установите подходящее значение для вашего приложения
      min: 0,
      acquire: 30000, // Увеличьте время ожидания подключения
      idle: 10000,
    },
  };
}
