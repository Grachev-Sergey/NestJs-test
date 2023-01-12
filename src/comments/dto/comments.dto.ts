import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CommentDto {
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
    description: 'Comment text',
    example: 'hardCover',
  })
  @IsString({ message: 'Comment text must be a string' })
  readonly commentText: string;
}
