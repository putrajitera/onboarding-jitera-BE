import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/authentication.guard';

@Controller('articles')
export class ArticlesController {
  
  @UseGuards(AuthGuard)
  @Get('list')
  getAllArticles(
    @Query() query: any,
  ) {

  }
}
