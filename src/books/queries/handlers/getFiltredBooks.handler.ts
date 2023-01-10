/* eslint-disable @typescript-eslint/indent */
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetFiltredBooksQuery } from '../impl';
import { Book } from '../../../db/entities/book.entity';

@QueryHandler(GetFiltredBooksQuery)
export class GetFiltredBooksHandler
  implements IQueryHandler<GetFiltredBooksQuery>
{
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(query: GetFiltredBooksQuery) {
    const { genre, sorting } = query;
    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);
    const page = Number(query.page);
    const search = `%${query.search}%`;
    const numberPerPage = 12;

    let sortBy: string;
    if (sorting === 'price') {
      sortBy = 'hardCoverPrice';
    } else if (sorting === 'name') {
      sortBy = 'title';
    } else if (sorting === 'author name') {
      sortBy = 'author';
    } else if (sorting === 'date of issue') {
      sortBy = 'dateOfIssue';
    } else {
      sortBy = sorting;
    }

    const filtredBooks = this.bookRepository
      .createQueryBuilder('book')
      .where('book.hardCoverPrice BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      })
      .orderBy(`book.${sortBy}`, 'ASC');

    if (genre.length) {
      const genreArr = genre.split(',');
      filtredBooks.innerJoinAndSelect(
        'book.genre',
        'genre',
        'genre.name IN (:...genreArr)',
        { genreArr },
      );
    }

    if (query.search) {
      filtredBooks.andWhere(
        'book.title ILIKE :search OR book.author ILIKE :search',
        { search },
      );
    }

    const counter = (await filtredBooks.getMany()).length;
    const books = await filtredBooks
      .take(numberPerPage)
      .skip((+page - 1) * numberPerPage)
      .getMany();
    return { books, counter, numberPerPage };
  }
}
