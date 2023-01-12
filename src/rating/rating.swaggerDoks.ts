import { ApiProperty } from '@nestjs/swagger';

export class RatingReq {
  @ApiProperty({ example: 15 })
  bookId: number;
  @ApiProperty({ example: 3 })
  id: number;
  @ApiProperty({ example: 3.5 })
  rating: number;
  @ApiProperty({ example: 2 })
  userId: number;
}

export const ratingExample = {
  bookId: 25,
  id: 4,
  rating: 4,
  userId: 3,
};
