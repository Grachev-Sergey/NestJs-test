import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Genre } from '../db/entities/genre.entity';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  controllers: [GenreController],
  providers: [...QueryHandlers, ...CommandHandlers],
  imports: [TypeOrmModule.forFeature([Genre]), CqrsModule],
})
export class GenreModule {}
