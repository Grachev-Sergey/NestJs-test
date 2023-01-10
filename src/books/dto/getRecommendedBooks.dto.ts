import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetRecommendedBooksDto {
  @ApiProperty({
    description: 'Book id',
    example: '1',
  })
  @IsOptional()
  @IsString({ message: 'Book id must be a string' })
  readonly id: string;
}
