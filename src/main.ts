import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { ValidationPipe } from './pipes/validation.pipe';

const PORT = config.serverPort;

(async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server start on port ${PORT}`);
  });
})();
