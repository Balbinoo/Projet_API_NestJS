import { NestFactory } from '@nestjs/core';
import { OeuvreModule } from './oeuvres.module';

async function bootstrap() {
  const app = await NestFactory.create(OeuvreModule);

  console.log('Starting the application after creating the module'); // Log application startup

  const port = process.env.PORT || 8080;

  console.log('The value of the port was defined,as ${port} '); // Log application startup

  await app.listen(port);
}
bootstrap();
