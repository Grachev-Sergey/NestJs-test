import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { User } from '../db/entities/user.entity';
import { Utils } from '../utils';

import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commads/handlers';

@Module({
  controllers: [UsersController],
  providers: [...QueryHandlers, ...CommandHandlers, Utils],
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CqrsModule],
})
export class UsersModule {}
