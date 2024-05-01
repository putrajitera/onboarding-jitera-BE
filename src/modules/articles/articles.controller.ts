import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authentication.guard';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articleService: ArticlesService,
  ){}

  @UseGuards(AuthGuard)
  @Get('list')
  articleList(
    @Query() query: any,
  ) {
    return this.articleService.articleList(query);
  }

  @Get('seed-article')
  seedArticleDb() {
    return this.articleService.seedArticleDb();
  }
}
