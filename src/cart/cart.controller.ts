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
import { ApiTags } from '@nestjs/swagger';

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

@ApiTags('Cart')
@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/')
  async getBooksFromCart(@Req() req: IRequestWithUser) {
    const user = req.user;
    return this.queryBus.execute(new GetBooksFromCartQuery(user));
  }

  @Post('/')
  async addToCart(@Body() cartDto: AddToCartDto, @Req() req: IRequestWithUser) {
    const bookId = cartDto.bookId;
    const { cover, price } = cartDto;
    const user = req.user;
    return this.commandBus.execute(
      new AddToCartCommand(user, bookId, cover, price),
    );
  }

  @Patch('/add-copy/:bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addCopyToCart(@Param('bookId') cartId: number) {
    return await this.commandBus.execute(new AddCopyToCartCommand(cartId));
  }

  @Patch('/remove-copy/:bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCopyFromCart(@Param('bookId') cartId: number) {
    return await this.commandBus.execute(new RemoveCopyFromCartCommand(cartId));
  }

  @Delete('/')
  async removeBookFromCart(@Query() query: RemoveBookFromCartDto) {
    const cartId = Number(query.cartId);
    return await this.commandBus.execute(new RemoveBookFromCartCommand(cartId));
  }

  @Delete('/all')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAllBooksFromCart(@Req() req: IRequestWithUser) {
    const user = req.user;
    return this.commandBus.execute(new RemoveAllBooksFromCartCommand(user));
  }
}
