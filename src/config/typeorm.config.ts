import type {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { defaultSource } from '../db/dataSource';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      ...defaultSource,
      entities: [`${__dirname}/../db/entities/*`],
      migrations: [`${__dirname}/../db/migrations/*`],
      synchronize: false,
      logging: false,
    };
  },
};
