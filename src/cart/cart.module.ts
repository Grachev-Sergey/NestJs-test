import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { CartController } from './cart.controller';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

import { Book } from '../db/entities/book.entity';
import { User } from '../db/entities/user.entity';
import { Cart } from '../db/entities/cart.entity';

@Module({
  controllers: [CartController],
  providers: [...QueryHandlers, ...CommandHandlers],
  imports: [
    TypeOrmModule.forFeature([Cart, User, Book]),
    CqrsModule,
    JwtModule,
  ],
})
export class CartModule {}
