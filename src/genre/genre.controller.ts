import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AddGenreCommand } from './commands/impl/addGenres.command';

import { AddGenreDto } from './dto/addGenre.dto';

import { AllGenresReq } from './genre.swaggerDoks';

import { GetAllGenresQuery } from './queries/impl';

@ApiTags('Genre')
@ApiBearerAuth('JWT-auth')
@Controller('genres')
export class GenreController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: HttpStatus.OK, type: AllGenresReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Genres not found',
  })
  @Get('/')
  async getAllGenres() {
    return this.queryBus.execute(new GetAllGenresQuery());
  }

  @ApiOperation({ summary: 'Add genre' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Post('/add-genre')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addGenre(@Body() genreDto: AddGenreDto) {
    const { genre } = genreDto;
    return this.commandBus.execute(new AddGenreCommand(genre));
  }
}
