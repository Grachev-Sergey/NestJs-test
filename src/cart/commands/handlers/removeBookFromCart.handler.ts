/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../../../db/entities/cart.entity';

import { RemoveBookFromCartCommand } from '../impl';

@CommandHandler(RemoveBookFromCartCommand)
export class RemoveBookFromCartHandler
  implements ICommandHandler<RemoveBookFromCartCommand>
{
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(handler: RemoveBookFromCartCommand) {
    const { cartId } = handler;

    const foundCartElem = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id = :cartId', { cartId })
      .getOne();

    if (!foundCartElem) {
      throw new HttpException('Book not found in cart', HttpStatus.NOT_FOUND);
    }

    const id = foundCartElem.id;
    await this.cartRepository.remove(foundCartElem);
    return { id };
  }
}
