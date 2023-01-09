import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'express';

import { AppModule } from './app.module';
import config from './config';
import { ValidationPipe } from './pipes/validation.pipe';

const PORT = config.serverPort;

(async () => {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs-test')
    .setDescription('The notes API description')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server start on port ${PORT}`);
  });
})();
