import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import type { Genre } from '../../db/entities/genre.entity';

export class UpdateBookDto {
  @ApiProperty({
    description: 'BookCover',
    example: "A-Killer's-Mind.jpeg",
  })
  @IsOptional()
  @IsString({ message: 'Book cover must be a string' })
  readonly cover?: string;

  @ApiProperty({
    description: 'Title of the book',
    example: "A Killer's Mind",
  })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  readonly title?: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Mike Omer',
  })
  @IsOptional()
  @IsString({ message: 'Author name must be a string' })
  readonly author?: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'The New York Times and Washington Post bestselling...',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  readonly description?: string;

  @ApiProperty({
    description: 'Date of issue',
    example: '2018',
  })
  @IsOptional()
  @IsString({ message: 'Date of issue must be a string' })
  readonly dateOfIssue?: string;

  @ApiProperty({
    description: 'Genres',
    example: ['Mystery', 'Thriller', 'Fiction'],
  })
  @IsOptional()
  @IsString({ message: 'Genres must be an array of strings' })
  readonly genre?: Genre[];

  @ApiProperty({
    description: 'Available hardcover',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean({ message: 'Hardcover must be a boolean' })
  readonly hardCover?: boolean;

  @ApiProperty({
    description: 'Price per hardcover book',
    example: '20',
  })
  @IsOptional()
  @IsNumber()
  readonly hardCoverPrice?: number;

  @ApiProperty({
    description: 'Soft cover available',
    example: 'false',
  })
  @IsOptional()
  @IsBoolean({ message: 'Paperback must be a boolean' })
  readonly paperback?: boolean;

  @ApiProperty({
    description: 'Paperback book price',
    example: '11',
  })
  @IsOptional()
  @IsNumber()
  readonly paperbackPrice?: number;

  @ApiProperty({
    description: 'Book status',
    example: 'Bestseller',
  })
  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  readonly status: string;

  @ApiProperty({
    description: 'Book rating',
    example: '3.5',
  })
  @IsOptional()
  @IsNumber()
  readonly rating?: number;
}
