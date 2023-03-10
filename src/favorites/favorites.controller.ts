import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  AddToFavoritesCommand,
  RemoveFromFavoritesCommand,
} from './commands/impl';
import { GetFavorites } from './queries/impl';

import { AddToFavoritesDto } from './dto/addToFavorites.dto';
import { RemoveFromFavoritesDto } from './dto/removeFromFavorites.dto';

import {
  AddToFavoritesReq,
  GetFavoritesReq,
  RemoveFromFavoritesReq,
} from './favorites.swaggerDocs';

@ApiTags('Favorite')
@ApiBearerAuth('JWT-auth')
@Controller('favorite')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ApiOperation({ summary: 'Get books from favorites' })
  @ApiResponse({ status: HttpStatus.OK, isArray: true, type: GetFavoritesReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Books not found',
  })
  @Get('/')
  async getFavorites(@Req() req: IRequestWithUser) {
    const user = req.user;
    return await this.queryBus.execute(new GetFavorites(user));
  }

  @ApiOperation({ summary: 'Add to favorites' })
  @ApiResponse({ status: HttpStatus.OK, type: AddToFavoritesReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found',
  })
  @Post('/')
  async addToFavorites(
    @Body() favorites: AddToFavoritesDto,
    @Req() req: IRequestWithUser,
  ) {
    const bookId = Number(favorites.bookId);
    const user = req.user;
    return this.commandBus.execute(new AddToFavoritesCommand(user, bookId));
  }

  @ApiOperation({ summary: 'Remove from favorites' })
  @ApiResponse({ status: HttpStatus.OK, type: RemoveFromFavoritesReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found in favorites',
  })
  @Delete('/')
  async removeFromFavorites(@Query() query: RemoveFromFavoritesDto) {
    const bookId = Number(query.bookId);
    const userId = Number(query.userId);
    return this.commandBus.execute(
      new RemoveFromFavoritesCommand(userId, bookId),
    );
  }
}
