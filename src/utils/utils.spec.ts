import { HttpException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import type { Repository } from 'typeorm';

import { User } from '../db/entities/user.entity';
import { Utils } from '.';
import { mockedJwtService } from './mocks/mockedJwtService';
import testConstants from './testConstants';

describe('Utils testing', () => {
  let utils: Utils;
  let userRepo: Repository<User>;
  let createQueryBuilder: jest.Mock;
  let where: jest.Mock;
  let select: jest.Mock;
  let getRawOne: jest.Mock;

  beforeEach(async () => {
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
        user_password: testConstants.TEST_HASHED_PASS,
      });
    });
    it('must return a boolean value', async () => {
      const result = await utils.checkMatchPass(
        testConstants.TEST_USER_ID,
        testConstants.TEST_PASS,
      );
      expect(result).toBe(true);
      expect(userRepo.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(where).toHaveBeenCalledWith('user.id = :userId', {
        userId: testConstants.TEST_USER_ID,
      });
      expect(select).toHaveBeenCalledWith('user.password');
    });
    it('must return a custom error', async () => {
      try {
        await utils.checkMatchPass(
          testConstants.TEST_USER_ID,
          testConstants.TEST_WRONG_PASS,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  describe('generate token', () => {
    it('must return a token', async () => {
      const result = await utils.generateToken(testConstants.TEST_USER_ID);
      expect(result).toEqual('generated token');
    });
  });
});
