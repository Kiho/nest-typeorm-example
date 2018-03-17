// import { NestFactory } from '@nestjs/core';
// import {ApplicationModule } from './modules/application/application.module';

import { NestFactory } from '@nestjs/core';
import {ApplicationModule } from './modules/application/application.module';
require('dotenv').config({path: './dev.env'});

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(process.env.PORT);
}
bootstrap();