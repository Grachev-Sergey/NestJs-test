import { DataSource } from 'typeorm';
import { config } from '../config';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
});

export default dataSource;
