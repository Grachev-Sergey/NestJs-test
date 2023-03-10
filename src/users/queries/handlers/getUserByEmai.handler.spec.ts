import { HttpException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';
import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { GetUserByEmailHandler } from './getUserByEmail.handler';

describe('get one user by email', () => {
  let getUserByEmail: GetUserByEmailHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByEmailHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
          },
        },
      ],
    }).compile();
    getUserByEmail = module.get(GetUserByEmailHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('success', () => {
    beforeEach(async () => {
      findOneBy.mockReturnValue(Promise.resolve(TEST_USER));
    });

    it('must return one user', async () => {
      const result = await userRepo.findOneBy({
        email: testConstants.TEST_USER_EMAIL,
      });
      expect(result).toEqual(TEST_USER);
      expect(userRepo.findOneBy).toHaveBeenCalled();

      const user = await getUserByEmail.execute({
        email: testConstants.TEST_USER_EMAIL,
      });
      expect(user).toEqual(TEST_USER);
    });
  });

  describe('fail', () => {
    beforeEach(() => {
      findOneBy.mockReturnValue(undefined);
    });

    it('error handling when searching for a user by email', async () => {
      try {
        await getUserByEmail.execute({
          email: testConstants.TEST_NON_EXISTENT_EMAIL,
        });
        expect(findOneBy).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
