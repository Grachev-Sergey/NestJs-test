import { Cart } from 'src/db/entities/cart.entity';
import { Favorite } from 'src/db/entities/favorite.entity';
import { Rating } from 'src/db/entities/rating.entity';
import type { User } from 'src/db/entities/user.entity';
// import type { GetUserByIdQuery } from 'src/users/queries/impl';

export default {
  TEST_HASHED_PASS:
    '$2a$10$.UTJ/t2/ab6GVsCND0ulG.K78ojLBIoUGt0CG4gb.R8DIKencmQea',
  TEST_PASS: '123123',
  TEST_WRONG_PASS: '321321',
  TEST_USER_ID: 6,
  TEST_NON_EXISTENT_ID: -1,
  TEST_USER_EMAIL: 'test-email@gmail.com',
  TEST_NON_EXISTENT_EMAIL: 'non-existent-email@gmail.com',
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
