/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../../../db/entities/cart.entity';

import { RemoveCopyFromCartCommand } from '../impl';

@CommandHandler(RemoveCopyFromCartCommand)
export class RemoveCopyFromCartHandler
  implements ICommandHandler<RemoveCopyFromCartCommand>
{
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(handler: RemoveCopyFromCartCommand) {
    const { cartId } = handler;

    const foundCartElem = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id = :cartId', { cartId })
      .getOne();

    if (!foundCartElem) {
      throw new HttpException('Book not found in cart', HttpStatus.NOT_FOUND);
    }

    if (foundCartElem.numberOfCopies > 1) {
      foundCartElem.numberOfCopies -= 1;
    }

    await this.cartRepository.save(foundCartElem);
  }
}
