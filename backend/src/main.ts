import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirestoreExceptionFilter } from './exception/firestore-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new FirestoreExceptionFilter())
  await app.listen(3000);
}
bootstrap();
