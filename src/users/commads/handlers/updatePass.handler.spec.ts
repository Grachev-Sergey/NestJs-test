import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';
import { Utils } from '../../../utils';
import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { UpdatePassHandler } from './updatePass.handler';

describe('Update user password', () => {
  let updatePassHandler: UpdatePassHandler;
  let userRepo: Repository<User>;
  let save: jest.Mock;
  let createQueryBuilder: jest.Mock;
  let where: jest.Mock;
  let leftJoinAndSelect1: jest.Mock;
  let leftJoinAndSelect2: jest.Mock;
  let leftJoinAndSelect3: jest.Mock;
  let getOne: jest.Mock;
  let utils: Utils;
  let checkMatchPass: jest.Mock;
  beforeEach(async () => {
    save = jest.fn();
    createQueryBuilder = jest.fn(() => ({ where }));
    where = jest.fn(() => ({ leftJoinAndSelect: leftJoinAndSelect1 }));
    leftJoinAndSelect1 = jest.fn(() => ({
      leftJoinAndSelect: leftJoinAndSelect2,
    }));
    leftJoinAndSelect2 = jest.fn(() => ({
      leftJoinAndSelect: leftJoinAndSelect3,
    }));
    leftJoinAndSelect3 = jest.fn(() => ({ getOne }));
    getOne = jest.fn();
    checkMatchPass = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePassHandler,
        Utils,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save,
            createQueryBuilder,
            where,
            leftJoinAndSelect1,
            leftJoinAndSelect3,
            leftJoinAndSelect2,
            getOne,
          },
        },
        {
          provide: Utils,
          useValue: {
            checkMatchPass,
          },
        },
      ],
    }).compile();
    updatePassHandler = module.get(UpdatePassHandler);
    utils = module.get(Utils);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });
  describe('update user password', () => {
    beforeEach(async () => {
      getOne.mockReturnValue(TEST_USER);
    });
    it('Must return user', async () => {
      const user = await updatePassHandler.execute({
        user: TEST_USER,
        password: testConstants.TEST_PASS,
        newPassword: testConstants.TEST_PASS,
      });
      expect(user.id).toEqual(TEST_USER.id);
      expect(user.email).toEqual(user.email);
      expect(userRepo.save).toHaveBeenCalled();
      expect(userRepo.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(where).toHaveBeenCalledWith('user.id = :userId', {
        userId: testConstants.TEST_USER_ID,
      });
      expect(leftJoinAndSelect1).toHaveBeenCalled;
      expect(leftJoinAndSelect2).toHaveBeenCalled;
      expect(leftJoinAndSelect3).toHaveBeenCalled;
      expect(leftJoinAndSelect1).toHaveBeenCalledWith('user.rating', 'rating');
      expect(leftJoinAndSelect2).toHaveBeenCalledWith(
        'user.favorite',
        'favorite',
      );
      expect(leftJoinAndSelect3).toHaveBeenCalledWith('user.cart', 'cart');

      expect(utils.checkMatchPass).toHaveBeenCalled();
    });
  });
});
