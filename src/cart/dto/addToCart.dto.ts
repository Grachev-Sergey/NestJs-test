import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  @IsString({ message: 'User id must be a string' })
  readonly userId: string;

  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsString({ message: 'Book id must be a string' })
  readonly bookId: string;

  @ApiProperty({
    description: 'Cover type',
    example: 'hardCover',
  })
  @IsString({ message: 'Cover must be a string' })
  readonly cover: string;

  @ApiProperty({
    description: 'Book price',
    example: '15',
  })
  @IsNumber()
  readonly price: number;
}
