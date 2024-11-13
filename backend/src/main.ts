import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirestoreExceptionFilter } from './exception/firestore-exception.filter';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FirestoreExceptionFilter())
  app.enableCors();

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
