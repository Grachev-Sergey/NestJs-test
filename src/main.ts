import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

const PORT = config.serverPort;

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server start on port ${PORT}`);
  });
})();
