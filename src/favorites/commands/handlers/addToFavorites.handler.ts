/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../../../db/entities/book.entity';
import { Favorite } from '../../../db/entities/favorite.entity';

import { AddToFavoritesCommand } from '../impl';

@CommandHandler(AddToFavoritesCommand)
export class AddToFavoritesHandler
  implements ICommandHandler<AddToFavoritesCommand>
{
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(handler: AddToFavoritesCommand) {
    const { user, bookId } = handler;

    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    const favorite = new Favorite();
    favorite.book = book;
    favorite.user = user;

    await this.favoriteRepository.save(favorite);

    const favoriteItem = {
      id: favorite.id,
      bookId: favorite.bookId,
      userId: favorite.userId,
    };

    return favoriteItem;
  }
}
