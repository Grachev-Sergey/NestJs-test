import type { User } from 'src/db/entities/user.entity';

export default {
  TEST_UTILS_HASHED_PASS:
    '$2a$10$.UTJ/t2/ab6GVsCND0ulG.K78ojLBIoUGt0CG4gb.R8DIKencmQea',
  TEST_UTILS_PASS: '123123',
  TEST_UTILS_WRONG_PASS: '321321',
  TEST_UTILS_USER_ID: 6,
};

export const testUser: User = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'test-email@gmail.com',
  name: 'test name',
  password: null,
};
