/* eslint-disable @typescript-eslint/indent */
import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetBooksFromCartQuery } from '../impl';

import { Cart } from '../../../db/entities/cart.entity';

@QueryHandler(GetBooksFromCartQuery)
export class GetBooksFromCartHandler
  implements IQueryHandler<GetBooksFromCartQuery>
{
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(handler: GetBooksFromCartQuery) {
    const userId = handler.user.id;

    const cart = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    if (!cart) {
      throw new HttpException('Cart is emty', HttpStatus.NOT_FOUND);
    }

    return { cart };
  }
}
