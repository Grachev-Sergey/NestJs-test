import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetOneBookQuery } from '../impl';
import { Book } from '../../../db/entities/book.entity';

@QueryHandler(GetOneBookQuery)
export class GetOneBookHandler implements IQueryHandler<GetOneBookQuery> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(query: GetOneBookQuery) {
    const { bookId } = query;

    const book = await this.bookRepository
      .createQueryBuilder('book')
      .where('book.id = :bookId', { bookId })
      // .leftJoinAndSelect('book.comments', 'comments')
      // .leftJoinAndSelect('comments.user', 'user')
      .getOne();

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    return { book };
  }
}
