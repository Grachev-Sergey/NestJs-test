import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';

import { UpdateInfoHandler } from './updateInfo.handler';

import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { HttpException } from '@nestjs/common';

describe('update info handler', () => {
  let updateInfoHandler: UpdateInfoHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  let save: jest.Mock;
  let createQueryBuilder: jest.Mock;
  let where: jest.Mock;
  let leftJoinAndSelect1: jest.Mock;
  let leftJoinAndSelect2: jest.Mock;
  let leftJoinAndSelect3: jest.Mock;
  let getOne: jest.Mock;
  beforeEach(async () => {
    findOneBy = jest.fn();
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateInfoHandler,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
            save,
            createQueryBuilder,
            where,
            leftJoinAndSelect1,
            leftJoinAndSelect3,
            leftJoinAndSelect2,
            getOne,
          },
        },
      ],
    }).compile();

    updateInfoHandler = module.get(UpdateInfoHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('success', () => {
    beforeEach(async () => {
      findOneBy.mockReturnValue(undefined);
      getOne.mockReturnValue(TEST_USER);
    });
    it('Must return user with new info', async () => {
      const user = await updateInfoHandler.execute({
        email: testConstants.TEST_USER_EMAIL,
        fullName: testConstants.TEST_USER_NAME,
        user: TEST_USER,
      });
      // eslint-disable-next-line no-console
      console.log('USER:', user);
      expect(user.id).toEqual(TEST_USER.id);
      expect(user.email).toEqual(user.email);
      expect(userRepo.findOneBy).toHaveBeenCalled();
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
    });
  });

  describe('fail', () => {
    beforeEach(async () => {
      findOneBy.mockReturnValue(TEST_USER);
    });

    it('error handling when searching for a user by email', async () => {
      try {
        await updateInfoHandler.execute({
          email: testConstants.TEST_USER_EMAIL,
          fullName: testConstants.TEST_USER_NAME,
          user: TEST_USER,
        });
        await userRepo.findOneBy({ email: testConstants.TEST_USER_EMAIL });
        expect(findOneBy).toHaveBeenCalled();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
