import { Cart } from '../db/entities/cart.entity';
import { Favorite } from '../db/entities/favorite.entity';
import { Rating } from '../db/entities/rating.entity';
import type { User } from '../db/entities/user.entity';
// import type { GetUserByIdQuery } from 'src/users/queries/impl';

export default {
  TEST_HASHED_PASS:
    '$2a$10$.UTJ/t2/ab6GVsCND0ulG.K78ojLBIoUGt0CG4gb.R8DIKencmQea',
  TEST_PASS: '123123',
  TEST_WRONG_PASS: '321321',
  TEST_USER_ID: 1,
  TEST_NON_EXISTENT_ID: -1,
  TEST_USER_EMAIL: 'test-email@gmail.com',
  TEST_USER_NAME: 'test name',
  TEST_NON_EXISTENT_EMAIL: 'non-existent-email@gmail.com',
  TEST_TOKEN: 'token',
};

export const TEST_USER: User = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test-email@gmail.com',
  fullName: 'test name',
  password: null,
  avatar: 'a52a277a-cd73-459e-af4a-400613000263',
  rating: [new Rating()],
  favorite: [new Favorite()],
  cart: [new Cart()],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changingPathInResponse() {},
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  activationLink: 'a52a277a-cd73-459e-af4a-400613000263',
  isActivated: true,
};

// export const TEST_GET_USER_BY_ID_QUERY: GetUserByIdQuery = {
//   userId: 1,
// };

export const TEST_USER_WITH_TOKENS = {
  tokens: {
    accessToken: 'token',
    refreshToken: 'token',
  },
  user: {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'test-email@gmail.com',
    fullName: 'test name',
    avatar: 'a52a277a-cd73-459e-af4a-400613000263',
    rating: [new Rating()],
    favorite: [new Favorite()],
    cart: [new Cart()],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    changingPathInResponse() {},
    activationLink: 'a52a277a-cd73-459e-af4a-400613000263',
    isActivated: true,
  },
};
