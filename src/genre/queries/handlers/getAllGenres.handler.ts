import type { IQueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetAllGenresQuery } from '../impl';
import { Genre } from '../../../db/entities/genre.entity';

@QueryHandler(GetAllGenresQuery)
export class GetAllGenresHandler implements IQueryHandler<GetAllGenresQuery> {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async execute() {
    const genres = await this.genreRepository.find();
    if (!genres) {
      throw new HttpException('Genres not found', HttpStatus.NOT_FOUND);
    }
    return { genres };
  }
}
