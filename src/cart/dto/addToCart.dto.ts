import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    description: 'User id',
    example: '1',
  })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsNumber()
  readonly bookId: number;

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
