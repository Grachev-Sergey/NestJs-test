/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '../../../db/entities/favorite.entity';

import { RemoveFromFavoritesCommand } from '../impl';

@CommandHandler(RemoveFromFavoritesCommand)
export class RemoveFromFavoritesHandler
  implements ICommandHandler<RemoveFromFavoritesCommand>
{
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async execute(handler: RemoveFromFavoritesCommand) {
    const userId = handler.userId;
    const bookId = handler.bookId;

    const foundInFavorites = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.userId = :userId AND favorite.bookId = :bookId', {
        userId,
        bookId,
      })
      .getOne();

    if (!foundInFavorites) {
      throw new HttpException(
        'Book not found in favorites',
        HttpStatus.NOT_FOUND,
      );
    }

    const id = foundInFavorites.id;
    await this.favoriteRepository.remove(foundInFavorites);
    return { id };
  }
}
