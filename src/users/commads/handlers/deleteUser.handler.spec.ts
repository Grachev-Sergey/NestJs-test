import { QueryBus } from '@nestjs/cqrs';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../db/entities/user.entity';
import type { Repository } from 'typeorm';

import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { DeleteUserHandler } from './deleteUser.handler';

describe('DeleteUser', () => {
  let deleteUserHandler: DeleteUserHandler;
  let userRepo: Repository<User>;
  let queryBus: QueryBus;
  let remove: jest.Mock;

  beforeEach(async () => {
    remove = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserHandler,
        QueryBus,
        {
          provide: getRepositoryToken(User),
          useValue: {
            remove,
          },
        },
      ],
    }).compile();
    deleteUserHandler = module.get(DeleteUserHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    queryBus = module.get(QueryBus);
  });
  describe('delete user', () => {
    beforeEach(() => {
      jest
        .spyOn(queryBus, 'execute')
        .mockReturnValue(Promise.resolve(TEST_USER));
    });
    it('must return a user', async () => {
      await deleteUserHandler.execute({
        userId: testConstants.TEST_USER_ID,
      });
      expect(userRepo.remove).toHaveBeenCalled();
      expect(queryBus.execute).toHaveBeenCalled();

      const user = await queryBus.execute({
        userId: testConstants.TEST_USER_ID,
      });
      expect(user).toEqual(TEST_USER);
    });
  });
});
