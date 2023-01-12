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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

import {
  AddBookReq,
  GetAllBooksReq,
  GetBookReq,
  GetFiltredBooksReq,
  GetRecommendedBooksReq,
  UpdateBookReq,
} from './books.swaggerDoks';

@ApiTags('Book')
@Controller('book')
export class BooksController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: HttpStatus.OK, type: GetAllBooksReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Books not found',
  })
  @Get('/')
  async getAllBooks() {
    return await this.queryBus.execute(new GetAllBooksQuery());
  }

  @ApiOperation({ summary: 'Get filtred books' })
  @ApiResponse({ status: HttpStatus.OK, type: GetFiltredBooksReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Books not found',
  })
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

  @ApiOperation({ summary: 'Get recommended books' })
  @ApiResponse({ status: HttpStatus.OK, type: GetRecommendedBooksReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Books not found',
  })
  @Get('/recommendations')
  async getRecommendedBooks(@Query() query: GetRecommendedBooksDto) {
    const { id } = query;
    return await this.queryBus.execute(new GetRecommendedBooksQuery(id));
  }

  @ApiOperation({ summary: 'Get book by id' })
  @ApiResponse({ status: HttpStatus.OK, type: GetBookReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found',
  })
  @Get('/:bookId')
  async getOneBook(@Param('bookId') bookId: number) {
    return await this.queryBus.execute(new GetOneBookQuery(bookId));
  }

  @ApiOperation({ summary: 'Add book' })
  @ApiResponse({ status: HttpStatus.OK, type: AddBookReq })
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

  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({ status: HttpStatus.OK, type: UpdateBookReq })
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
  @ApiOperation({ summary: 'Remove book' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found',
  })
  @Delete('/:bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('bookId') bookId: number) {
    return await this.commandBus.execute(new DeleteBookCommand(bookId));
  }
}
