import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface UsersAttributes {
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'users', timestamps: false })
export class Users
  extends Model<UsersAttributes, UsersAttributes>
  implements UsersAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'users_pkey', using: 'btree', unique: true })
  email!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  created_at?: Date;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  updated_at?: Date;
}
