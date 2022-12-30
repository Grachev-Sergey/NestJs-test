import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';
import { GetAllUsersHandler } from './getAllUsers.handler';
import { TEST_USER } from '../../../utils/testConstants';

describe('get all users', () => {
  let getAllUsersHandler: GetAllUsersHandler;
  let userRepo: Repository<User>;
  let find: jest.Mock;
  beforeEach(async () => {
    find = jest.fn().mockReturnValue(Promise.resolve([TEST_USER]));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllUsersHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find,
          },
        },
      ],
    }).compile();
    getAllUsersHandler = module.get(GetAllUsersHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('must return all users', async () => {
    jest.spyOn(getAllUsersHandler, 'execute');

    const result = await userRepo.find();
    expect(result).toEqual([TEST_USER]);
    expect(userRepo.find).toHaveBeenCalled();
  });
});
