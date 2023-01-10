/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rating } from '../../../db/entities/rating.entity';
import { Book } from '../../../db/entities/book.entity';

import { ChangeRatingCommand } from '../impl';

@CommandHandler(ChangeRatingCommand)
export class ChangeRatingHandler
  implements ICommandHandler<ChangeRatingCommand>
{
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async changeBookRating(bookId: number) {
    const bookRating = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.bookId = :bookId', { bookId })
      .getMany();
    let sumRating = 0;

    bookRating.forEach((item) => {
      sumRating += item.rating;
    });

    return Number((sumRating / bookRating.length).toFixed(1));
  }

  async execute(handler: ChangeRatingCommand) {
    const { bookId, rating } = handler;
    const userId = handler.user.id;
    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    const ratedItem = await this.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.userId = :userId AND rating.bookId = :bookId', {
        userId,
        bookId,
      })
      .getOne();

    if (ratedItem) {
      ratedItem.rating = rating;

      await this.ratingRepository.save(ratedItem);

      const resultRating = await this.changeBookRating(bookId);

      book.rating = resultRating;

      await this.bookRepository.save(book);

      return ratedItem;
    }

    const newRating = new Rating();
    newRating.userId = userId;
    newRating.bookId = bookId;
    newRating.rating = rating;

    await this.ratingRepository.save(newRating);

    const resultRating = await this.changeBookRating(bookId);

    book.rating = resultRating;

    await this.bookRepository.save(book);

    return newRating;
  }
}
