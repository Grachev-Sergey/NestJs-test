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
  db: {
    name: combinedEnv.POSTGRES_DB,
    user: combinedEnv.POSTGRES_USER,
    password: combinedEnv.POSTGRES_PASSWORD,
    host: combinedEnv.POSTGRES_HOST,
    port: Number(combinedEnv.POSTGRES_PORT),
  },
  token: {
    secretKey: combinedEnv.TOKEN_SEKRET_KEY,
    expiresIn: combinedEnv.TOKEN_EXPIRES_IN,
  },
  salt: Number(combinedEnv.salt),
};
