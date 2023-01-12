import { ApiProperty } from '@nestjs/swagger';

import { Cart } from '../db/entities/cart.entity';

export const cartExample = {
  bookCover: 'hardCover',
  bookId: 8,
  id: 8,
  numberOfCopies: 1,
  price: 5.99,
  userId: 3,
};

export class GetBooksFromCartReq {
  @ApiProperty({
    example: [
      {
        ...cartExample,
      },
    ],
  })
  cart: Cart;
}

export class AddToCartReq {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 1 })
  bookCover: string;
  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: 1 })
  bookId: number;
  @ApiProperty({ example: 6.99 })
  price: number;
}

export class RemoveBookFromCartReq {
  @ApiProperty({ example: 1 })
  id: number;
}
