require('dotenv').config();

if (!process.env.DATABASE_FOLDER)
  throw new Error('Need to provide DATABASE_FOLDER environment variable');

const {
  DialectPostgres,
  ModelBuilder,
} = require('sequelize-typescript-generator');

const configs = {
  'knowledge': require('../knowledge/config/config'),
};

(async () => {
  const dbConfig = configs[process.env.DATABASE_FOLDER];

  const env = process.env.NODE_ENV || 'development';
  console.log(env)

  const config = {
    connection: dbConfig[env],
    metadata: {
      indices: true,
      case: {
        model: 'PASCAL',
        column: 'UNDERSCORE',
      },
    },
    output: {
      clean: true,
      outDir: 'src/database/models/' + process.env.DATABASE_FOLDER,
    },
    strict: true,
  };

  const dialect = new DialectPostgres();

  const builder = new ModelBuilder(config, dialect);

  try {
    await builder.build();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
