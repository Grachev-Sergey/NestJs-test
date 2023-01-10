import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetAllBooksQuery } from '../impl';
import { Book } from '../../../db/entities/book.entity';

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute() {
    const books = await this.bookRepository
      .createQueryBuilder('book')
      .getMany();
    if (!books) {
      throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
    }
    return { books };
  }
}
