/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../../../db/entities/cart.entity';

import { RemoveAllBooksFromCartCommand } from '../impl';

@CommandHandler(RemoveAllBooksFromCartCommand)
export class RemoveAllBooksFromCartHandler
  implements ICommandHandler<RemoveAllBooksFromCartCommand>
{
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(handler: RemoveAllBooksFromCartCommand) {
    const userId = handler.user.id;

    const foundCart = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getMany();

    if (!foundCart) {
      throw new HttpException('Cart is emty', HttpStatus.NOT_FOUND);
    }

    await this.cartRepository.remove(foundCart);
  }
}
