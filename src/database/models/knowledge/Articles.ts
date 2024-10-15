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
  user_email?: string;
  title: string;
  body: string;
  tags: string;
  type: string;
}

@Table({ tableName: 'articles', timestamps: false })
export class Articles
  extends Model<ArticlesAttributes, ArticlesAttributes>
  implements ArticlesAttributes
{
  @Column({ allowNull: true, type: DataType.STRING(255) })
  user_email?: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'articles_pkey', using: 'btree', unique: true })
  title!: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'articles_pkey', using: 'btree', unique: true })
  body!: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'articles_pkey', using: 'btree', unique: true })
  tags!: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'articles_pkey', using: 'btree', unique: true })
  type!: string;
}
