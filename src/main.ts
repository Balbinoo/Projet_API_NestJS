import { NestFactory } from '@nestjs/core';
import { OeuvreModule } from './oeuvres.module';

async function bootstrap() {
  const app = await NestFactory.create(OeuvreModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
