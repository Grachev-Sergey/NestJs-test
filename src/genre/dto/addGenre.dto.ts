import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddGenreDto {
  @ApiProperty({
    description: 'Genre',
    example: 'Fiction',
  })
  @IsString({ message: 'Genre must be a string' })
  readonly genre?: string;
}
