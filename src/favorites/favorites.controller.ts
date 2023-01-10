import {
  Body,
  Controller,
  Delete,
  Get,
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
  AddToFavoritesCommand,
  RemoveFromFavoritesCommand,
} from './commands/impl';
import { GetFavorites } from './queries/impl';

import { AddToFavoritesDto } from './dto/addToFavorites.dto';
import { RemoveFromFavoritesDto } from './dto/removeFromFavorites.dto';

@ApiTags('Favorites')
@Controller('favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get('/')
  async getFavorites(@Req() req: IRequestWithUser) {
    const user = req.user;
    return await this.queryBus.execute(new GetFavorites(user));
  }

  @Post('/')
  async addToFavorites(
    @Body() favorites: AddToFavoritesDto,
    @Req() req: IRequestWithUser,
  ) {
    const bookId = Number(favorites.bookId);
    const user = req.user;
    return this.commandBus.execute(new AddToFavoritesCommand(user, bookId));
  }

  @Delete('/')
  async removeFromFavorites(@Query() query: RemoveFromFavoritesDto) {
    const bookId = Number(query.bookId);
    const userId = Number(query.userId);
    return this.commandBus.execute(
      new RemoveFromFavoritesCommand(userId, bookId),
    );
  }
}
