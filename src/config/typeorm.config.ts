import { ConfigModule, ConfigService } from '@nestjs/config';
import type {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { config } from './config';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.name,
      entities: [`${__dirname}/../db/entities/*`],
      migrations: [`${__dirname}/../db/migrations/*`],
      synchronize: false,
      logging: false,
    };
  },
};
