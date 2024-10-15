import { Controller } from "@nestjs/common";
import { ArticleService } from "./articles.service";
import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateArticleDto, UpdateArticleDto } from "./dto";
import { Articles } from "src/database/models/knowledge";

@Controller('articles')
export class ArticlesController {
constructor(private readonly service: ArticleService) {}
@Post()
async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<Articles> {
    return this.service.createArticle(createArticleDto);
}

@Get(':id')
async getArticle(@Param('id') id: string): Promise<Articles> {
    return this.service.getArticle(id);
}

@Get()
async getArticles(@Query('tags') tags?: string): Promise<Articles[]> {
    const tagsArray = tags ? tags.split(' ') : [];
    return this.service.getArticles(tagsArray);
}

@Put(':id')
async updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto): Promise<Articles> {
    return this.service.updateArticle(id, updateArticleDto);
}

@Delete(':id')
async deleteArticle(@Param('id') id: string): Promise<void> {
    return this.service.deleteArticle(id);
}
}