import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../db/entities/user.entity';
import { testUser } from '../../../utils/testConstants';
import type { Repository } from 'typeorm';
import { GetUserByIdHandler } from './getUserById.handler';

describe('get one user by id', () => {
  let getUserById: GetUserByIdHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn().mockReturnValue(Promise.resolve(testUser));
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
  it('must return one user', async () => {
    jest.spyOn(getUserById, 'execute');

    const result = await userRepo.findOneBy({ id: testUser.id });
    expect(result).toEqual(testUser);
    expect(userRepo.findOneBy).toHaveBeenCalled();
  });
});
