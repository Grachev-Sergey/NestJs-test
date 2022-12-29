import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../db/entities/user.entity';
import { Utils } from '.';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedJwtService } from './mocks/mockedJwtService';
import type { Repository } from 'typeorm';
import testConstants from './testConstants';
import { HttpException } from '@nestjs/common';

describe('Utils testing', () => {
  let utils: Utils;
  let userRepo: Repository<User>;
  let find: jest.Mock;
  let createQueryBuilder: jest.Mock;
  let where: jest.Mock;
  let select: jest.Mock;
  let getRawOne: jest.Mock;

  beforeEach(async () => {
    find = jest.fn();
    getRawOne = jest.fn();
    select = jest.fn(() => ({ getRawOne }));
    where = jest.fn(() => ({ select }));
    createQueryBuilder = jest.fn(() => ({ where }));
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Utils,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find,
            createQueryBuilder,
            where,
            select,
            getRawOne,
          },
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    utils = module.get(Utils);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('check match passwords', () => {
    beforeEach(() => {
      getRawOne.mockReturnValue({
        user_password: testConstants.TEST_UTILS_HASHED_PASS,
      });
    });
    it('must return a boolean value', async () => {
      const result = await utils.checkMatchPass(
        testConstants.TEST_UTILS_USER_ID,
        testConstants.TEST_UTILS_PASS,
      );
      expect(result).toBe(true);
      expect(userRepo.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(where).toHaveBeenCalledWith('user.id = :userId', {
        userId: testConstants.TEST_UTILS_USER_ID,
      });
      expect(select).toHaveBeenCalledWith('user.password');
    });
    it('must return a custom error', async () => {
      try {
        await utils.checkMatchPass(
          testConstants.TEST_UTILS_USER_ID,
          testConstants.TEST_UTILS_WRONG_PASS,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('generate token', () => {
    it('must return a token', async () => {
      const result = await utils.generateToken(
        testConstants.TEST_UTILS_USER_ID,
      );
      expect(result).toEqual('generated token');
    });
  });

  describe('get all user test', () => {
    let user: User;
    beforeEach(() => {
      find.mockReturnValue(Promise.resolve([user]));
    });
    it('must return all users', async () => {
      const result = await utils.getAllUser();
      expect(result).toEqual([user]);
      expect(userRepo.find).toHaveBeenCalled();
    });
  });
});
