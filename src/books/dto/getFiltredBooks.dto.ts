import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetFiltredBooksDto {
  @ApiProperty({
    description: 'Selected genres',
    example: 'Fantasy, Childrens',
  })
  @IsOptional()
  @IsString({ message: 'Genre must be a string' })
  readonly genre?: string;

  @ApiProperty({
    description: 'Min prise',
    example: '5',
  })
  @IsOptional()
  @IsString({ message: 'Price must be a string' })
  readonly minPrice?: string;

  @ApiProperty({
    description: 'Max Price',
    example: '100',
  })
  @IsOptional()
  @IsString({ message: 'Price must be a string' })
  readonly maxPrice?: string;

  @ApiProperty({
    description: 'Selected sorting',
    example: 'price',
  })
  @IsOptional()
  @IsString({ message: 'Sorting must be a string' })
  readonly sorting?: string;

  @ApiProperty({
    description: 'Selected page',
    example: '1',
  })
  @IsOptional()
  @IsString({ message: 'Page must be a string' })
  readonly page?: string;

  @ApiProperty({
    description: "Author's name or book title",
    example: 'John Green',
  })
  @IsOptional()
  @IsString({ message: "Author's name or book title must be a string" })
  readonly search?: string;
}
