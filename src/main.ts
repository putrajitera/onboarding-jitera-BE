import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { configService } from './configs';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());
  await app.listen(configService.port);
  Logger.log(`Server listening on port: ${configService.port}`);
}
bootstrap();
