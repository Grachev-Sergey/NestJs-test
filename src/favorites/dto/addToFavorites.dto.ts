import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddToFavoritesDto {
  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  @IsNumber()
  readonly userId?: string;

  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsNumber()
  readonly bookId?: string;
}
