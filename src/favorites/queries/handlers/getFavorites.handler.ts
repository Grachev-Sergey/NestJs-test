import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from '../../../db/entities/favorite.entity';
import { GetFavorites } from '../impl';

@QueryHandler(GetFavorites)
export class GetFavoritesHandler implements IQueryHandler<GetFavorites> {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async execute(handler: GetFavorites) {
    const userId = handler.user.id;

    const favoriteBooks = await this.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.userId = :userId', { userId })
      .leftJoinAndSelect('favorite.book', 'book')
      .getMany();

    if (!favoriteBooks) {
      throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
    }
    return favoriteBooks;
  }
}
