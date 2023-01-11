import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AddBookDto } from './dto/addBook.dto';
import { GetFiltredBooksDto } from './dto/getFiltredBooks.dto';
import { GetRecommendedBooksDto } from './dto/getRecommendedBooks.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

import {
  GetAllBooksQuery,
  GetFiltredBooksQuery,
  GetOneBookQuery,
  GetRecommendedBooksQuery,
} from './queries/impl';
import {
  AddBookCommand,
  DeleteBookCommand,
  UpdateBookCommand,
} from './commands/impl';

@ApiTags('Book')
@Controller('book')
export class BooksController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/')
  async getAllBooks() {
    return await this.queryBus.execute(new GetAllBooksQuery());
  }

  @Get('/filtred-books')
  async getFiltredBooks(@Query() query: GetFiltredBooksDto) {
    const { genre, maxPrice, minPrice, search, sorting, page } = query;
    return await this.queryBus.execute(
      new GetFiltredBooksQuery(
        genre,
        minPrice,
        maxPrice,
        sorting,
        page,
        search,
      ),
    );
  }

  @Get('/recommendations')
  async getRecommendedBooks(@Query() query: GetRecommendedBooksDto) {
    const { id } = query;
    return await this.queryBus.execute(new GetRecommendedBooksQuery(id));
  }

  @Get('/:bookId')
  async getOneBook(@Param('bookId') bookId: number) {
    return await this.queryBus.execute(new GetOneBookQuery(bookId));
  }

  @Post('/add-book')
  async addBook(@Body() bookDto: AddBookDto) {
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
    } = bookDto;

    return this.commandBus.execute(
      new AddBookCommand(
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
      ),
    );
  }

  @Patch('/:bookId')
  async updateBook(
    @Param('bookId') bookId: number,
    @Body() bookDto: UpdateBookDto,
  ) {
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
    } = bookDto;

    return this.commandBus.execute(
      new UpdateBookCommand(
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
        bookId,
      ),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:bookId')
  async deleteBook(@Param('bookId') bookId: number) {
    return await this.commandBus.execute(new DeleteBookCommand(bookId));
  }
}
