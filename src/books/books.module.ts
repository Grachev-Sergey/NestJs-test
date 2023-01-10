import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from '../db/entities/book.entity';
import { Genre } from '../db/entities/genre.entity';
import { User } from '../db/entities/user.entity';

import { Utils } from '../utils';
import { BooksController } from './books.controller';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  controllers: [BooksController],
  providers: [...QueryHandlers, ...CommandHandlers, Utils],
  imports: [
    TypeOrmModule.forFeature([Book, Genre, User]),
    JwtModule,
    CqrsModule,
  ],
})
export class BooksModule {}
