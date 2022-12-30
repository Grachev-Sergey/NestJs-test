import { HttpException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';
import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { CreateUserHandler } from './createUser.handler';

describe('get one user by email', () => {
  let createUserHandler: CreateUserHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  let save: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn();
    save = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
            save,
          },
        },
      ],
    }).compile();
    createUserHandler = module.get(CreateUserHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('success', () => {
    beforeEach(async () => {
      findOneBy.mockReturnValue(undefined);
      save.mockResolvedValue(TEST_USER);
    });

    it('must return one user', async () => {
      const result = await userRepo.findOneBy({
        email: testConstants.TEST_NON_EXISTENT_EMAIL,
      });
      expect(result).toEqual(undefined);
      expect(userRepo.findOneBy).toHaveBeenCalled();

      const newUser = await userRepo.save(TEST_USER);
      expect(newUser).toEqual(TEST_USER);
      expect(userRepo.save).toHaveBeenCalled();

      const user = await createUserHandler.execute({
        email: testConstants.TEST_NON_EXISTENT_EMAIL,
        password: testConstants.TEST_PASS,
      });
      expect(user).toEqual(TEST_USER);
    });
  });

  describe('fail', () => {
    beforeEach(() => {
      findOneBy.mockReturnValue(Promise.resolve(TEST_USER));
    });

    it('error handling when searching for a user by email', async () => {
      try {
        await createUserHandler.execute({
          email: testConstants.TEST_USER_EMAIL,
          password: testConstants.TEST_PASS,
        });
        expect(findOneBy).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
