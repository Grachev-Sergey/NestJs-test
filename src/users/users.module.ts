import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/db/entities/user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commads/handlers';
import { CheckMatchPasswords } from 'src/utils/checkMatchPasswords';
@Module({
  controllers: [UsersController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    UsersService,
    CheckMatchPasswords,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    CqrsModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
