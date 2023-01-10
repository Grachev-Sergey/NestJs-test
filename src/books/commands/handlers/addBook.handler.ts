import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';

import { AddBookCommand } from '../impl';
import { Book } from '../../../db/entities/book.entity';
import { Genre } from '../../../db/entities/genre.entity';

@CommandHandler(AddBookCommand)
export class AddBookHandler implements ICommandHandler<AddBookCommand> {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async execute(handler: AddBookCommand) {
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
      rating,
    } = handler;

    const book = new Book();
    book.cover = cover;
    book.title = title;
    book.author = author;
    book.description = description;
    book.dateOfIssue = dateOfIssue;
    book.hardCover = hardCover;
    book.hardCoverPrice = hardCoverPrice;
    book.paperback = paperback;
    book.paperbackPrice = paperbackPrice;
    book.status = status;
    book.rating = rating;

    const arr = [];
    const foundGenre = await this.genreRepository.find({
      where: {
        name: Any(genre),
      },
    });
    arr.push(...foundGenre);
    book.genre = arr;

    const newBook = await this.bookRepository.save(book);
    return { newBook };
  }
}
