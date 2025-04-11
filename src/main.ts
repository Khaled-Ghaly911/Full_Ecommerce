import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const session = require('cookie-session');
import * as dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000/graphql', // your frontend URL
    credentials: true, // 👈 allow cookies
  });
  

  await app.listen(3000);
}
bootstrap();
