import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { winstonLogger } from './shared/logger/logger.config';
import cookieParser from 'cookie-parser';
import createDatabaseIfNotExists from './config/create-database';

async function bootstrap() {
  await createDatabaseIfNotExists();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLogger,
  });

  // Get ConfigService instance
  const configService = app.get(ConfigService);

  // Get port from environment variables
  const port = configService.get<number>('PORT');

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Use cookie-parser middleware
  app.use(cookieParser());

  // start server
  await app.listen(port);

  // log
  Logger.log(`Server is running on port ${port}`);
}
bootstrap();
