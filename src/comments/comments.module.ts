import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { CommentsGeteway } from './comments.gateway';
import { Comment } from '../db/entities/comments.entity';
import { CommandHandlers } from './commands/handlers';

@Module({
  providers: [CommentsGeteway, ...CommandHandlers],
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
})
export class CommentsModule {}
