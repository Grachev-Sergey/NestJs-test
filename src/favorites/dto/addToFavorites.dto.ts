import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddToFavoritesDto {
  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  @IsString({ message: 'User id must be a string' })
  readonly userId?: string;

  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsString({ message: 'Book id must be a string' })
  readonly bookId?: string;
}
