import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';

import IRequestWithUser from '../interfaces/requestWithUser.interface';
import { ChangeRatingCommand } from './commands/impl';

import { ChangeRatingDto } from './dto/changeRating.dto';

@ApiTags('Rating')
@Controller('rating')
@UseGuards(AuthGuard)
export class RatingController {
  constructor(private commandBus: CommandBus) {}

  @Post('/')
  async changeRating(
    @Body() ratingDto: ChangeRatingDto,
    @Req() req: IRequestWithUser,
  ) {
    const bookId = Number(ratingDto.bookId);
    const { rating } = ratingDto;
    const user = req.user;
    return this.commandBus.execute(
      new ChangeRatingCommand(user, bookId, rating),
    );
  }
}
