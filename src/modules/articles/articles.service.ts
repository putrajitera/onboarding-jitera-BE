import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { configService } from 'src/configs';
import { Article } from 'src/database/entities/article.entity';
import { generatePagination } from 'src/utils/pagination.util';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ){}

  async articleList(query: any) {
    const limit = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;
    const result = await this.articleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      pagination: generatePagination(page, result[1], limit),
      data: result[0],
    }
  }

  async seedArticleDb() {
    const data = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${configService.newsApiKey}`);
    const result = await data.json();
    const article = result.articles.map(i => {
      return {
        title: i.title,
        description: i.description,
        content: i.content,
        publishedAt: i.publishedAt,
      }
    });
    for (const i of article) {
      await this.articleRepository.save(i);
    }
    return {
      status: 'ok',
      message: 'seeding succesfull',
    }
  }
}
