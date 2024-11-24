import { NestFactory } from '@nestjs/core';
import { OeuvreModule } from './oeuvres.module';

async function bootstrap() {
  const app = await NestFactory.create(OeuvreModule);
  await app.listen(3000);
}
bootstrap();
