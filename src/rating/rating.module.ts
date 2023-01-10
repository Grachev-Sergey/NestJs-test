import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { RatingController } from './rating.controller';

import { CommandHandlers } from './commands/handlers';

import { Book } from '../db/entities/book.entity';
import { User } from '../db/entities/user.entity';
import { Rating } from 'src/db/entities/rating.entity';

@Module({
  controllers: [RatingController],
  providers: [...CommandHandlers],
  imports: [
    TypeOrmModule.forFeature([Rating, User, Book]),
    CqrsModule,
    JwtModule,
  ],
})
export class RatingModule {}
