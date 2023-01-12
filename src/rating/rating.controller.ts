import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';

import IRequestWithUser from '../interfaces/requestWithUser.interface';

import { ChangeRatingCommand } from './commands/impl';

import { ChangeRatingDto } from './dto/changeRating.dto';

import { RatingReq } from './rating.swaggerDoks';

@ApiTags('Rating')
@ApiBearerAuth('JWT-auth')
@Controller('rating')
@UseGuards(AuthGuard)
export class RatingController {
  constructor(private commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Change book rating' })
  @ApiResponse({ status: HttpStatus.OK, type: RatingReq })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found',
  })
  @Post('/')
  async changeRating(
    @Body() ratingDto: ChangeRatingDto,
    @Req() req: IRequestWithUser,
  ) {
    const bookId = ratingDto.bookId;
    const { rating } = ratingDto;
    const user = req.user;
    return this.commandBus.execute(
      new ChangeRatingCommand(user, bookId, rating),
    );
  }
}
