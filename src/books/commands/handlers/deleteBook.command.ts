import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteBookCommand } from '../impl';
import { Book } from '../../../db/entities/book.entity';

@CommandHandler(DeleteBookCommand)
export class AddBookHandler implements ICommandHandler<DeleteBookCommand> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(handler: DeleteBookCommand) {
    const { bookId } = handler;
    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);
    }
    await this.bookRepository.remove(book);
  }
}
