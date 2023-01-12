import { ApiProperty } from '@nestjs/swagger';

import { Book } from '../db/entities/book.entity';

import { bookExample } from '../books/books.swaggerDoks';

export class GetFavoritesReq {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 1 })
  bookId: number;
  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: { ...bookExample } })
  book: Book;
}

export class AddToFavoritesReq {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 1 })
  bookId: number;
  @ApiProperty({ example: 1 })
  userId: number;
}

export class RemoveFromFavoritesReq {
  @ApiProperty({ example: 1 })
  id: number;
}

export const favoriteExample = {
  id: 1,
  bookId: 1,
  userId: 1,
};
