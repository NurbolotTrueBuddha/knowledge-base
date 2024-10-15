import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ARTICLE_MODEL } from 'src/constants';
import { Articles } from 'src/database/models/knowledge';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { Op } from 'sequelize';

@Injectable()
export class ArticleService {
    constructor(
        @Inject(ARTICLE_MODEL)
        private readonly articleModel: typeof Articles,
    ) {}

    async createArticle(createArticleDto: CreateArticleDto): Promise<Articles> {
        return this.articleModel.create(createArticleDto);
    }

    async getArticle(title: string): Promise<Articles> {
        const article = await this.articleModel.findOne({ where: { title } });
        if (!article) {
            throw new NotFoundException(`Article with title ${title} not found`);
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

    async updateArticle(title: string, updateArticleDto: UpdateArticleDto): Promise<Articles> {
        const article = await this.getArticle(title);
        return article.update(updateArticleDto);
    }

    async deleteArticle(title: string): Promise<void> {
        const article = await this.getArticle(title);
        await article.destroy();
    }
}