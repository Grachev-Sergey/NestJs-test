import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import testConstants, { MOCKED_USER } from '../utils/testConstants';
import { AuthGuard } from '../guards/auth.guard';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import * as request from 'supertest';
import type { CanActivate, INestApplication } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('user controller', () => {
  let app: INestApplication;
  let controller: UsersController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;
  let userData: User;
  let sign: jest.Mock;
  beforeEach(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const usersRepository = {
      save: jest.fn().mockReturnValue(Promise.resolve(userData)),
      find: jest.fn().mockReturnValue(Promise.resolve([userData])),
    };
    sign = jest.fn();
    execute: jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CommandBus,
        QueryBus,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
        {
          provide: JwtService,
          useValue: {
            sign,
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();
    controller = module.get<UsersController>(UsersController);
    commandBus = module.get(CommandBus);
    queryBus = module.get(QueryBus);
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all user', () => {
    beforeEach(() => {
      jest.spyOn(queryBus, 'execute').mockResolvedValue([MOCKED_USER]);
    });
    it('return all users', async () => {
      const res = await request(app.getHttpServer())
        .get('/user/all')
        .expect(200);
      expect(res.body).toEqual([MOCKED_USER]);
      return res;
    });
  });

  describe('get user by id', () => {
    describe('success', () => {
      beforeEach(() => {
        jest.spyOn(queryBus, 'execute').mockResolvedValue(MOCKED_USER);
      });
      it('return one user', async () => {
        const res = await request(app.getHttpServer())
          .get(`/user/${testConstants.TEST_USER_ID}`)
          .expect(200);
        expect(res.body).toEqual(MOCKED_USER);
        return res;
      });
    });

    describe('fail', () => {
      beforeEach(() => {
        jest.spyOn(queryBus, 'execute').mockImplementation(() => {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        });
      });
      it('throw an exception', () => {
        return request(app.getHttpServer())
          .get(`/user/${testConstants.TEST_NON_EXISTENT_ID}`)
          .expect(404);
      });
    });
  });

  describe('get current user', () => {
    beforeEach(() => {
      jest.spyOn(queryBus, 'execute').mockResolvedValue(MOCKED_USER);
    });
    it('return current user', async () => {
      const res = await request(app.getHttpServer()).get('/user').expect(200);
      expect(res.body).toEqual(MOCKED_USER);
      return res;
    });
  });

  describe('change user info', () => {
    describe('success', () => {
      beforeEach(() => {
        jest.spyOn(commandBus, 'execute').mockResolvedValue(MOCKED_USER);
      });
      it('return modified user', async () => {
        const res = await request(app.getHttpServer())
          .patch('/user/change-info')
          .send({
            email: testConstants.TEST_USER_EMAIL,
            fullName: testConstants.TEST_USER_NAME,
          })
          .expect(200);
        expect(res.body.id).toEqual(MOCKED_USER.id);
        expect(res.body.email).toEqual(MOCKED_USER.email);
        return res;
      });
    });

    describe('fail', () => {
      beforeEach(() => {
        jest.spyOn(commandBus, 'execute').mockImplementation(() => {
          throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
        });
      });
      it('throw an exception', () => {
        return request(app.getHttpServer())
          .patch('/user/change-info')
          .expect(400);
      });
    });
  });

  ///////////////////////////////
  describe('change user pass', () => {
    describe('success', () => {
      beforeEach(() => {
        jest.spyOn(commandBus, 'execute').mockResolvedValue(MOCKED_USER);
      });
      it('return modified user', () => {
        return request(app.getHttpServer())
          .patch('/user/change-pass')
          .send({
            password: testConstants.TEST_PASS,
            newPassword: testConstants.TEST_WRONG_PASS,
          })
          .expect(200);
        // expect(userData);
      });
    });

    describe('fail', () => {
      beforeEach(() => {
        jest.spyOn(commandBus, 'execute').mockImplementation(() => {
          throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        });
      });
      it('throw an exception', () => {
        return request(app.getHttpServer())
          .patch('/user/change-pass')
          .expect(400);
      });
    });

    it('should throw a validation exception', () => {
      return request(app.getHttpServer())
        .patch('/user/change-pass')
        .send({
          password: testConstants.TEST_PASS,
        })
        .expect(400);
    });
  });

  describe('change user photo', () => {
    beforeEach(() => {
      jest.spyOn(commandBus, 'execute').mockResolvedValue(MOCKED_USER);
    });
    it('return modified user', () => {
      return request(app.getHttpServer())
        .patch('/user/upload-photo')
        .send({
          avatar: testConstants.TEST_ENCODED_AVATAR,
        })
        .expect(200);
      // expect(userData);
    });
  });

  // describe('delete user', () => {
  //   beforeEach(() => {
  //     jest.spyOn(commandBus, 'execute').mockResolvedValue(MOKED_USER);
  //   });
  //   it('return modified user', () => {
  //     return request(app.getHttpServer())
  //       .delete('/user/')
  //       .send({
  //         avatar: testConstants.TEST_ENCODED_AVATAR,
  //       })
  //       .expect(200);
  //     // expect(userData);
  //   });
  // });
});

describe('user controller with an unauthorized user', () => {
  let app: INestApplication;
  let controller: UsersController;
  let userData: User;
  let sign: jest.Mock;
  beforeEach(async () => {
    const usersRepository = {
      save: jest.fn().mockReturnValue(Promise.resolve(userData)),
      find: jest.fn().mockReturnValue(Promise.resolve([userData])),
    };
    sign = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        CommandBus,
        QueryBus,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
        {
          provide: JwtService,
          useValue: {
            sign,
          },
        },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get all users should return an unauthorized exception', async () => {
    return request(app.getHttpServer()).get('/user/all').expect(401);
  });

  it('get one user should return an unauthorized exception', async () => {
    return request(app.getHttpServer())
      .get(`/user/${testConstants.TEST_USER_ID}`)
      .expect(401);
  });

  it('get current users should return an unauthorized exception', () => {
    return request(app.getHttpServer()).get('/user').expect(401);
  });

  it('change user info should return an unauthorized exception', async () => {
    return request(app.getHttpServer())
      .patch('/user/change-info')
      .send({
        email: testConstants.TEST_USER_EMAIL,
        fullName: testConstants.TEST_USER_NAME,
      })
      .expect(401);
  });

  it('change user password should return an unauthorized exception', () => {
    return request(app.getHttpServer())
      .patch('/user/change-pass')
      .send({
        password: testConstants.TEST_PASS,
        newPassword: testConstants.TEST_WRONG_PASS,
      })
      .expect(401);
  });

  it('change user photo should return an unauthorized exception', () => {
    return request(app.getHttpServer())
      .patch('/user/upload-photo')
      .send({
        avatar: testConstants.TEST_ENCODED_AVATAR,
      })
      .expect(401);
  });

  it('user delete request should return an unauthorized exception', () => {
    return request(app.getHttpServer())
      .delete(`/user/${testConstants.TEST_USER_ID}`)
      .send({
        avatar: testConstants.TEST_ENCODED_AVATAR,
      })
      .expect(401);
  });
});
