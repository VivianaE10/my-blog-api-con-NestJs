import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; //habilitamos de forma global las validaciones

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //validaciones globales
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
