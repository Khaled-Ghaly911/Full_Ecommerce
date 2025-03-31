import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const session = require('cookie-session');
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      name: 'session',
      keys: process.env.SECRETKEY || 'hello',
      maxAge: 24 * 60 * 60 * 1000
    })
  )

  await app.listen(3000);
}
bootstrap();
