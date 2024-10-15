import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Controller,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { Articles } from 'src/database/models/knowledge';
import { HttpAuthGuard } from 'src/auth/auth.guard';
import { ArticleService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticleService) {}

  @Post()
  @UseGuards(HttpAuthGuard)
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Articles> {
    return this.service.createArticle(createArticleDto);
  }

  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<Articles> {
    const article = await this.service.getArticle(id);
    if (article.type == 'public' || this.isAuthorizedUser()) {
      return article;
    }
    throw new ForbiddenException('Access denied');
  }

  @Get()
  async getArticles(@Query('tags') tags?: string): Promise<Articles[]> {
    const tagsArray = tags ? tags.split(' ') : [];
    if (this.isAuthorizedUser()) {
      return this.service.getArticles(tagsArray);
    }
    return this.service.getPublicArticles(tagsArray);
  }

  @Put(':id')
  @UseGuards(HttpAuthGuard)
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Articles> {
    return this.service.updateArticle(id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(HttpAuthGuard)
  async deleteArticle(@Param('id') id: string): Promise<void> {
    return this.service.deleteArticle(id);
  }

  private isAuthorizedUser(): boolean {
    return !!Request['user'];
  }
}
