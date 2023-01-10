import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AddGenreCommand } from './commands/impl/addGenres.command';
import { AddGenreDto } from './dto/addGenre.dto';
import { GetAllGenresQuery } from './queries/impl';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/')
  async getAllGenres() {
    return this.queryBus.execute(new GetAllGenresQuery());
  }

  @Post('/add-genre')
  async addGenrу(@Body() genreDto: AddGenreDto) {
    const { genre } = genreDto;
    return this.commandBus.execute(new AddGenreCommand(genre));
  }
}
