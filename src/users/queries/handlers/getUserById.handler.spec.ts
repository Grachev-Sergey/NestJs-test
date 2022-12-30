import { HttpException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';
import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { GetUserByIdHandler } from './getUserById.handler';

describe('get one user by id', () => {
  let getUserById: GetUserByIdHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
          },
        },
      ],
    }).compile();
    getUserById = module.get(GetUserByIdHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('success', () => {
    beforeEach(async () => {
      findOneBy.mockReturnValue(Promise.resolve(TEST_USER));
    });

    it('must return one user', async () => {
      const result = await userRepo.findOneBy({ id: TEST_USER.id });
      expect(result).toEqual(TEST_USER);
      expect(userRepo.findOneBy).toHaveBeenCalled();

      const user = await getUserById.execute({
        userId: testConstants.TEST_USER_ID,
      });
      expect(user).toEqual(TEST_USER);
    });
  });

  describe('fail', () => {
    beforeEach(() => {
      findOneBy.mockReturnValue(undefined);
    });

    it('error handling when searching for a user by id', async () => {
      try {
        await getUserById.execute({
          userId: testConstants.TEST_NON_EXISTENT_ID,
        });
        expect(findOneBy).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
