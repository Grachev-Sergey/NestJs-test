import { ApiProperty } from '@nestjs/swagger';

import { Book } from '../db/entities/book.entity';

import { userExample } from '../users/user.swaggerDoks';

export const bookExample = {
  author: 'Angela Carter',
  cover: 'http://localhost:4000/static/booksCover/Book-of-Fairy-Tales.jpeg',
  dateOfIssue: '1992',
  description:
    "Once upon a time, fairy tales weren't just meant for children...",
  hardCover: true,
  hardCoverPrice: 5.99,
  id: 8,
  paperback: false,
  paperbackPrice: null,
  rating: 4.5,
  status: null,
  title: 'Book of Fairy Tales',
};

const comment = {
  bookId: 18,
  comment: 'example text',
  createdAt: '2023-01-11T11:33:36.585Z',
  id: 1,
  user: { ...userExample },
};

export class GetAllBooksReq {
  @ApiProperty({
    example: [
      {
        ...bookExample,
      },
    ],
  })
  books: [Book];
}

export class GetFiltredBooksReq {
  @ApiProperty({
    example: [{ ...bookExample }],
  })
  books: [Book];
  @ApiProperty({
    example: 36,
  })
  counter: number;
  @ApiProperty({
    example: 12,
  })
  numberPerPage: number;
}

export class GetRecommendedBooksReq {
  @ApiProperty({
    example: [{ ...bookExample }],
  })
  recomended: number;
}

export class GetBookReq {
  @ApiProperty({
    example: { ...bookExample, comments: [{ ...comment }] },
  })
  book: number;
}

export class AddBookReq {
  @ApiProperty({
    example: { ...bookExample },
  })
  newBook: Book;
}

export class UpdateBookReq {
  @ApiProperty({
    example: { ...bookExample },
  })
  updatedBook: Book;
}
