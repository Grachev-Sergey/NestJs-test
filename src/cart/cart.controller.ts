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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';

import IRequestWithUser from '../interfaces/requestWithUser.interface';

import {
  AddCopyToCartCommand,
  AddToCartCommand,
  RemoveAllBooksFromCartCommand,
  RemoveBookFromCartCommand,
  RemoveCopyFromCartCommand,
} from './commands/impl';
import { GetBooksFromCartQuery } from './queries/impl';

import { AddToCartDto } from './dto/addToCart.dto';
import { RemoveBookFromCartDto } from './dto/removeBookFromCart.dto';

import {
  AddToCartReq,
  GetBooksFromCartReq,
  RemoveBookFromCartReq,
} from './cart.swaggerDoks';

@ApiTags('Cart')
@ApiBearerAuth('JWT-auth')
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get books from cart' })
  @ApiResponse({ status: HttpStatus.OK, type: GetBooksFromCartReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cart is emty',
  })
  @Get('/')
  async getBooksFromCart(@Req() req: IRequestWithUser) {
    const user = req.user;
    return this.queryBus.execute(new GetBooksFromCartQuery(user));
  }

  @ApiOperation({ summary: 'Add book to cart' })
  @ApiResponse({ status: HttpStatus.OK, type: AddToCartReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found',
  })
  @Post('/')
  async addToCart(@Body() cartDto: AddToCartDto, @Req() req: IRequestWithUser) {
    const bookId = cartDto.bookId;
    const { cover, price } = cartDto;
    const user = req.user;
    return this.commandBus.execute(
      new AddToCartCommand(user, bookId, cover, price),
    );
  }

  @ApiOperation({ summary: 'Add book copy to cart' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found in cart',
  })
  @Patch('/add-copy/:bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addCopyToCart(@Param('bookId') cartId: number) {
    return await this.commandBus.execute(new AddCopyToCartCommand(cartId));
  }

  @ApiOperation({ summary: 'Remove book copy from cart' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found in cart',
  })
  @Patch('/remove-copy/:bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCopyFromCart(@Param('bookId') cartId: number) {
    return await this.commandBus.execute(new RemoveCopyFromCartCommand(cartId));
  }

  @ApiOperation({ summary: 'Remove book from cart' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveBookFromCartReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found in cart',
  })
  @Delete('/')
  async removeBookFromCart(@Query() query: RemoveBookFromCartDto) {
    const cartId = Number(query.cartId);
    return await this.commandBus.execute(new RemoveBookFromCartCommand(cartId));
  }

  @ApiOperation({ summary: 'Remove all books from cart' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Cart is emty',
  })
  @Delete('/all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAllBooksFromCart(@Req() req: IRequestWithUser) {
    const user = req.user;
    return this.commandBus.execute(new RemoveAllBooksFromCartCommand(user));
  }
}
