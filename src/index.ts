import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "./config";

(async () => {
  const PORT = config.serverPort;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {console.log(`Server start on port ${PORT}`)})
})()