import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../db/entities/user.entity';
import { testUser } from '../../../utils/testConstants';
import type { Repository } from 'typeorm';
import { GetUserByEmailHandler } from './getUserByEmail.handler';

describe('get one user by email', () => {
  let getUserByEmail: GetUserByEmailHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn().mockReturnValue(Promise.resolve(testUser));
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
  it('must return one user', async () => {
    jest.spyOn(getUserByEmail, 'execute');

    const result = await userRepo.findOneBy({ email: testUser.email });
    expect(result).toEqual(testUser);
    expect(userRepo.findOneBy).toHaveBeenCalled();
  });
});
