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
  name: 'test name',
  password: null,
};

// export const TEST_GET_USER_BY_ID_QUERY: GetUserByIdQuery = {
//   userId: 1,
// };
