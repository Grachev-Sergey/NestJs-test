/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../../../db/entities/cart.entity';

import { AddCopyToCartCommand } from '../impl';

@CommandHandler(AddCopyToCartCommand)
export class AddCopyToCartHandler
  implements ICommandHandler<AddCopyToCartCommand>
{
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async execute(handler: AddCopyToCartCommand) {
    const { bookId } = handler;

    const foundCartElem = await this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.bookId = :bookId', { bookId })
      .getOne();

    if (!foundCartElem) {
      throw new HttpException('Book not found in cart', HttpStatus.NOT_FOUND);
    }

    foundCartElem.numberOfCopies += 1;

    await this.cartRepository.save(foundCartElem);
  }
}
