import * as dotenv from 'dotenv';
import * as path from 'path';

const localEnv = dotenv.config({
  path: path.normalize(`${__dirname}/../../.env`),
}).parsed;
const defaultEnv = dotenv.config({
  path: path.normalize(`${__dirname}/../../default.env`),
}).parsed;

const combinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

dotenv.config();

export default {
  serverPort: Number(combinedEnv.PORT),
  apiUrl: combinedEnv.API_URL,
  frontUrl: combinedEnv.FRONT_URL,
  db: {
    name: combinedEnv.POSTGRES_DB,
    user: combinedEnv.POSTGRES_USER,
    password: combinedEnv.POSTGRES_PASSWORD,
    host: combinedEnv.POSTGRES_HOST,
    port: Number(combinedEnv.POSTGRES_PORT),
  },
  token: {
    access: {
      secretKey: combinedEnv.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: combinedEnv.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    },
    refresh: {
      secretKey: combinedEnv.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: combinedEnv.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      cookieMaxAge: Number(
        combinedEnv.COOKIE_JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      ),
    },
  },
  smtp: {
    host: combinedEnv.SMTP_HOST,
    port: combinedEnv.SMTP_PORT,
    user: combinedEnv.SMTP_USER,
    pass: combinedEnv.SMTP_PASS,
    generatedPass: combinedEnv.SMTP_GENETATED_PASS,
  },
  salt: Number(combinedEnv.salt),
};
