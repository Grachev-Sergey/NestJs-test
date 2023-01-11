import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddBookDto {
  @ApiProperty({
    description: 'Book cover',
    example: "A-Killer's-Mind.jpeg",
  })
  @IsString({ message: 'Book cover must be a string' })
  readonly cover?: string;

  @ApiProperty({
    description: 'Title of the book',
    example: "A Killer's Mind",
  })
  @IsString({ message: 'Title must be a string' })
  readonly title?: string;

  @ApiProperty({
    description: 'Author name',
    example: 'Mike Omer',
  })
  @IsString({ message: 'Author name must be a string' })
  readonly author?: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'The New York Times and Washington Post bestselling...',
  })
  @IsString({ message: 'Description must be a string' })
  readonly description?: string;

  @ApiProperty({
    description: 'Date of issue',
    example: '2018',
  })
  @IsString({ message: 'Date of issue must be a string' })
  readonly dateOfIssue?: string;

  @ApiProperty({
    description: 'Genres',
    example: ['Mystery', 'Thriller', 'Fiction'],
  })
  @IsArray({ message: 'Genres must be an array of strings' })
  readonly genre?: string[];

  @ApiProperty({
    description: 'Available hardcover',
    example: 'true',
  })
  @IsBoolean({ message: 'Hardcover must be a boolean' })
  readonly hardCover?: boolean;

  @ApiProperty({
    description: 'Price per hardcover book',
    example: '20',
  })
  @IsNumber()
  readonly hardCoverPrice?: number;

  @ApiProperty({
    description: 'Soft cover available',
    example: 'false',
  })
  @IsBoolean({ message: 'Paperback must be a boolean' })
  readonly paperback?: boolean;

  @ApiProperty({
    description: 'Paperback book price',
    example: '11',
  })
  @IsNumber()
  @IsOptional()
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
  @IsNumber()
  readonly rating?: number;
}
