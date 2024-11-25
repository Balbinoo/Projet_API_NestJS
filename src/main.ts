import { NestFactory } from '@nestjs/core';
import { OeuvreModule } from './oeuvres.module';

async function bootstrap() {
  const app = await NestFactory.create(OeuvreModule);
  const port = process.env.PORT || 8080;  
  await app.listen(port, '0.0.0.0');
}
bootstrap();
