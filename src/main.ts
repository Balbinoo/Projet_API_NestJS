import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OeuvreModule } from './oeuvres.module';

async function bootstrap() {
  const app = await NestFactory.create(OeuvreModule);
  await app.listen(8080);
}
bootstrap();

