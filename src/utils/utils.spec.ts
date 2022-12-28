/* eslint-disable prettier/prettier */
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../db/entities/user.entity';
import { Utils } from '.';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockedJwtService } from './mocks/jwtServise';
import type { Repository } from 'typeorm';

describe('Utils testing', () => {
  let utils: Utils;
  let find: jest.Mock;
  let userRepo: Repository<User>;

  beforeEach(async () => {
    find = jest.fn();
    // let user: User;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Utils,
        {
          provide: getRepositoryToken(User),
          useValue: {
            // checkMatchPass: jest.fn().mockResolvedValue(true),
            // generateToken: jest.fn().mockResolvedValue(mockToken),
            // find: jest.fn().mockResolvedValue(Promise.resolve([user])),
            find,
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
  // describe('check match passwords', () => {
  //   it('must return a boolean value', async () => {
  //     // const getRawOne = jest.fn();`
  //     // const select = jest.fn(() => ({ getRawOne }));
  //     // const where = jest.fn(() => ({ select }));
  //     // const createQueryBuilder = jest.fn(() => ({ where }));
  //     const result = await utils.checkMatchPass(6, '123123');
  //     expect(result).toBe(true);
  //   });
  // });
  describe('some test', () => {
    it('must return sum', async () => {
      const result = await utils.getSum(2, 2);
      expect(result).toBe(4);
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
