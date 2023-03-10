import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../db/entities/user.entity';
import { Utils } from '../utils';
import { AuthController } from './auth.controller';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  controllers: [AuthController],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers, Utils],
  imports: [TypeOrmModule.forFeature([User]), JwtModule, CqrsModule],
  exports: [JwtModule],
})
export class AuthModule {}
