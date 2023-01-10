import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateBookCommand } from '../impl';
import { Book } from '../../../db/entities/book.entity';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async execute(handler: UpdateBookCommand) {
    const {
      cover,
      title,
      author,
      description,
      dateOfIssue,
      genre,
      hardCover,
      hardCoverPrice,
      paperback,
      paperbackPrice,
      status,
      bookId,
    } = handler;

    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);
    }

    book.cover = cover;
    book.title = title;
    book.author = author;
    book.description = description;
    book.dateOfIssue = dateOfIssue;
    book.genre = genre;
    book.hardCover = hardCover;
    book.hardCoverPrice = hardCoverPrice;
    book.paperback = paperback;
    book.paperbackPrice = paperbackPrice;
    book.status = status;

    const updatedBook = await this.bookRepository.save(book);
    return { updatedBook };
  }
}
