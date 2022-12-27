import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

import config from '../config';
import { User } from './entities/user.entity';

export const defaultSource: DataSourceOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
};

const dataSource = new DataSource(defaultSource);

export const userRepository = dataSource.getRepository(User);

export default dataSource;
