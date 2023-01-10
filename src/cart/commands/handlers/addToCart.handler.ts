/* eslint-disable @typescript-eslint/indent */
import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../../../db/entities/book.entity';
import { Cart } from '../../../db/entities/cart.entity';

import { AddToCartCommand } from '../impl';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(handler: AddToCartCommand) {
    const { user, bookId, cover, price } = handler;

    const book = await this.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    cart.bookCover = cover;
    cart.price = price;

    await this.cartRepository.save(cart);

    const newCartItem = {
      id: cart.id,
      bookCover: cart.bookCover,
      bookId: cart.bookId,
      price: cart.price,
      userId: cart.userId,
    };

    return newCartItem;
  }
}
