import { HttpException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';

import { CreateUserHandler } from './createUser.handler';

import { Utils } from '../../../utils';
import testConstants, {
  TEST_USER,
  TEST_USER_WITH_TOKENS,
} from '../../../utils/testConstants';

describe('get one user by email', () => {
  let utils: Utils;
  let createUserHandler: CreateUserHandler;
  let userRepo: Repository<User>;
  let findOneBy: jest.Mock;
  let save: jest.Mock;
  let generateTokens: jest.Mock;
  let sign: jest.Mock;

  beforeEach(async () => {
    findOneBy = jest.fn();
    save = jest.fn();
    generateTokens = jest.fn();
    sign = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        Utils,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
            save,
            generateTokens,
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign,
          },
        },
      ],
    }).compile();
    utils = module.get(Utils);
    createUserHandler = module.get(CreateUserHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('must return one user', () => {
    beforeEach(async () => {
      findOneBy.mockReturnValue(undefined);
      save.mockResolvedValue(TEST_USER);
      generateTokens.mockResolvedValue({
        accessToken: testConstants.TEST_TOKEN,
        refreshToken: testConstants.TEST_TOKEN,
      });
      sign.mockReturnValue(testConstants.TEST_TOKEN);
    });

    it('success', async () => {
      const foundUser = await userRepo.findOneBy({
        email: testConstants.TEST_NON_EXISTENT_EMAIL,
      });
      expect(foundUser).toEqual(undefined);
      expect(userRepo.findOneBy).toHaveBeenCalled();

      const tokens = await utils.generateTokens(testConstants.TEST_USER_ID);
      expect(tokens).toEqual({
        accessToken: testConstants.TEST_TOKEN,
        refreshToken: testConstants.TEST_TOKEN,
      });
      const newUser = await userRepo.save(TEST_USER);
      expect(newUser).toEqual(TEST_USER);
      expect(userRepo.save).toHaveBeenCalled();

      const user = await createUserHandler.execute({
        email: testConstants.TEST_USER_EMAIL,
        password: testConstants.TEST_PASS,
      });
      expect(user.tokens.accessToken).toEqual(
        TEST_USER_WITH_TOKENS.tokens.accessToken,
      );
      expect(user.tokens.accessToken).toEqual(
        TEST_USER_WITH_TOKENS.tokens.accessToken,
      );
      expect(user.user.id).toEqual(TEST_USER_WITH_TOKENS.user.id);
      expect(user.user.email).toEqual(TEST_USER_WITH_TOKENS.user.email);
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
