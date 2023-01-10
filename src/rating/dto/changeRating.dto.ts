import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ChangeRatingDto {
  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsString({ message: 'Book id must be a string' })
  readonly bookId: string;

  @ApiProperty({
    description: 'Rating',
    example: '3.5',
  })
  @IsNumber()
  readonly rating: number;
}
