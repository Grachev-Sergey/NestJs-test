import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeRatingDto {
  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsNumber()
  readonly bookId: number;

  @ApiProperty({
    description: 'Rating',
    example: '3.5',
  })
  @IsNumber()
  readonly rating: number;
}
