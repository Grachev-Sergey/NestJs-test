import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveBookFromCartDto {
  @ApiProperty({
    description: 'Cart id',
    example: '1',
  })
  @IsString({ message: 'Cart id must be a string' })
  readonly cartId: string;
}
