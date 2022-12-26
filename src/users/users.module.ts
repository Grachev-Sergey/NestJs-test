import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/db/entities/user.entity';

import { UsersController } from './users.controller';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commads/handlers';
import { Utils } from 'src/utils';
@Module({
  controllers: [UsersController],
  providers: [...QueryHandlers, ...CommandHandlers, Utils],
  imports: [TypeOrmModule.forFeature([User]), AuthModule, CqrsModule],
})
export class UsersModule {}
