import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import * as fs from 'node:fs/promises';

import { User } from '../../../db/entities/user.entity';
import testConstants, { TEST_USER } from '../../../utils/testConstants';
import { UpdatePhotoHandler } from './updatePhoto.handler';

jest.mock('fs');

describe('Update user photo', () => {
  let updatePhotoHandler: UpdatePhotoHandler;
  let userRepo: Repository<User>;
  let save: jest.Mock;
  let createQueryBuilder: jest.Mock;
  let where: jest.Mock;
  let leftJoinAndSelect1: jest.Mock;
  let leftJoinAndSelect2: jest.Mock;
  let leftJoinAndSelect3: jest.Mock;
  let getOne: jest.Mock;
  let fsWriteFile: jest.Mock;
  let fsUnlink: jest.Mock;
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
    fsWriteFile = jest.fn();
    fsUnlink = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePhotoHandler,
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
      ],
    }).compile();
    updatePhotoHandler = module.get(UpdatePhotoHandler);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });
  describe('update user password', () => {
    beforeEach(async () => {
      getOne.mockReturnValue(TEST_USER);
      (fs.writeFile as jest.Mock) = fsWriteFile;
      (fs.unlink as jest.Mock) = fsUnlink;
    });
    it('Must return user', async () => {
      const user = await updatePhotoHandler.execute({
        user: TEST_USER,
        avatar: testConstants.TEST_ENCODED_AVATAR,
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
      expect(fsUnlink).toHaveBeenCalled;
      expect(fsWriteFile).toHaveBeenCalled;
    });
  });
});
