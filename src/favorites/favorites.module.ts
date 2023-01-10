import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

import { Book } from '../db/entities/book.entity';
import { User } from '../db/entities/user.entity';
import { Favorite } from '../db/entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [...QueryHandlers, ...CommandHandlers],
  imports: [
    TypeOrmModule.forFeature([Favorite, User, Book]),
    CqrsModule,
    JwtModule,
  ],
})
export class FavoritesModule {}
