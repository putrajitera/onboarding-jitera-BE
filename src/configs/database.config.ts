import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  "port": parseInt(process.env.DATABASE_PORT),
  "username": process.env.DATABASE_USERNAME,
  "password": process.env.DATABASE_PASSWORD,
  "database": process.env.DATABASE_NAME,
  "entities": ["dist/**/**/*.entity{.ts,.js}"],
  "synchronize": true
};