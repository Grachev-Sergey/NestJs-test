import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genre } from '../../../db/entities/genre.entity';
import { AddGenreCommand } from '../impl';

@CommandHandler(AddGenreCommand)
export class AddGenreHandler implements ICommandHandler<AddGenreCommand> {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async execute(handler: AddGenreCommand) {
    const { name } = handler;
    const genre = new Genre();
    genre.name = name;
    await this.genreRepository.save(genre);
  }
}
