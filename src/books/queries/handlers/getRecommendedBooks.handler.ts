/* eslint-disable @typescript-eslint/indent */
import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetRecommendedBooksQuery } from '../impl';
import { Book } from '../../../db/entities/book.entity';

@QueryHandler(GetRecommendedBooksQuery)
export class GetRecommendedBooksHandler
  implements IQueryHandler<GetRecommendedBooksQuery>
{
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(query: GetRecommendedBooksQuery) {
    const { bookId } = query;

    const books = await this.bookRepository
      .createQueryBuilder('books')
      .getMany();

    if (!books) {
      throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
    }

    const recommended = books
      .filter((item) => item.id !== Number(bookId))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return { recommended };
  }
}
