/* eslint-disable @typescript-eslint/indent */
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../../../db/entities/comments.entity';

import { AddCommentCommand } from '../impl';

@CommandHandler(AddCommentCommand)
export class AddCommentHandler implements ICommandHandler<AddCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async execute(handler: AddCommentCommand) {
    const { bookId, userId, commentText } = handler;

    const comment = new Comment();
    comment.bookId = bookId;
    comment.userId = userId;
    comment.comment = commentText;

    await this.commentRepository.save(comment);

    const id = comment.id;

    const replyWithComment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .leftJoinAndSelect('comment.user', 'user')
      .getOne();

    return replyWithComment;
  }
}
