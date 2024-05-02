import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authentication.guard';
import { ArticlesService } from './articles.service';
import { SuperAdminGuard } from 'src/guards/super-admin.guard';

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

  @UseGuards(SuperAdminGuard)
  @Get('seed-article')
  seedArticleDb() {
    return this.articleService.seedArticleDb();
  }
}
