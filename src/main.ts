import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/config';

(async () => {
  const PORT = config.serverPort;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server start on port ${PORT}`);
  });
})();
