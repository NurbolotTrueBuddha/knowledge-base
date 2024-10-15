import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { ARTICLE_MODEL } from 'src/constants';
import { Articles } from 'src/database/models/knowledge';
import { CreateArticleDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ARTICLE_MODEL)
    private readonly articleModel: typeof Articles,
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<Articles> {
    return this.articleModel.create(createArticleDto);
  }

  async getArticle(id: string): Promise<Articles> {
    const article = await this.articleModel.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async getArticles(tags?: string[]): Promise<Articles[]> {
    if (tags && tags.length > 0) {
      return this.articleModel.findAll({
        where: {
          tags: {
            [Op.like]: `%${tags.join('%')}%`,
          },
        },
      });
    }
    return this.articleModel.findAll();
  }

  async getPublicArticles(tags?: string[]): Promise<Articles[]> {
    if (tags && tags.length > 0) {
      return this.articleModel.findAll({
        where: {
          type: 'public',
          tags: {
            [Op.like]: `%${tags.join('%')}%`,
          },
        },
      });
    }
    return this.articleModel.findAll({
      where: {
        type: 'public',
      },
    });
  }

  async updateArticle(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Articles> {
    const article = await this.getArticle(id);
    return article.update(updateArticleDto);
  }

  async deleteArticle(id: string): Promise<void> {
    const article = await this.getArticle(id);
    await article.destroy();
  }
}
