import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Middleware
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
bootstrap();
