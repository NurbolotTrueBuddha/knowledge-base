import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface ArticlesAttributes {
  id?: number;
  user_email?: string;
  title?: string;
  body?: string;
  tags?: string;
  type?: string;
}

@Table({ tableName: 'articles', timestamps: false })
export class Articles
  extends Model<ArticlesAttributes, ArticlesAttributes>
  implements ArticlesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('articles_id_seq'::regclass)"),
  })
  @Index({ name: 'articles_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  user_email?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  title?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  body?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  tags?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  type?: string;
}
