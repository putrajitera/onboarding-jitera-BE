import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './configs/database.config';
import { ArticlesModule } from './modules/articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
    ArticlesModule,
  ],
})
export class AppModule {}
