import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';

import { LogOutHandler } from './logOut.handler';

import { TEST_USER } from '../../../utils/testConstants';

describe('DeleteUser', () => {
  let userRepo: Repository<User>;
  let logOutHandler: LogOutHandler;
  let save: jest.Mock;

  beforeEach(async () => {
    save = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogOutHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save,
          },
        },
      ],
    }).compile();
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    logOutHandler = module.get(LogOutHandler);
  });
  describe('delete user', () => {
    it('must return a user', async () => {
      await logOutHandler.execute({ user: TEST_USER });
      expect(userRepo.save).toHaveBeenCalled();
    });
  });
});
