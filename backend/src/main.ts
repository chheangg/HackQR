import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirestoreExceptionFilter } from './exception/firestore-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new FirestoreExceptionFilter())
  app.enableCors();

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
