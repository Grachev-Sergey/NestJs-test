import { ApiProperty } from '@nestjs/swagger';

import { User } from '../db/entities/user.entity';

import { cartExample } from '../cart/cart.swaggerDoks';
import { favoriteExample } from '../favorites/favorites.swaggerDocs';
import { ratingExample } from '../rating/rating.swaggerDoks';

export const userExample = {
  id: 1,
  email: 'example@gmail.com',
  name: 'Bob',
  avatar:
    'http://localhost:4000/avatars/5555e0a3-147b-4121-8ff9-03b9e9b8c6c1.png',
  isActivated: true,
};

export class UserReq {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: '2023-01-11T11:34:39.771Z' })
  createdAt: string;
  @ApiProperty({ example: '2023-01-12T08:16:09.015Z' })
  updatedAt: string;
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;
  @ApiProperty({ example: 'Bob' })
  fullName: string;
  @ApiProperty({
    example:
      'http://localhost:4000/static/avatars/fd4337c1-d7b5-4986-a9e2-c887bc742223.png',
  })
  avatar: string;
}

export class UserWithRrelationsReq {
  @ApiProperty({
    example: {
      ...userExample,
      rating: [{ ...ratingExample }],
      favorite: [{ ...favoriteExample }],
      cart: [{ ...cartExample }],
    },
  })
  user: User;
}
