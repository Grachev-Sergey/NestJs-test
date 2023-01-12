import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import * as uuid from 'uuid';

import config from '../../../config';
import { User } from '../../../db/entities/user.entity';
import { CreateUserCommand } from '../impl';
import { Utils } from '../../../utils';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utils: Utils,
  ) {}

  async execute(handler: CreateUserCommand) {
    const { email, password } = handler;
    const candidate = await this.userRepository.findOneBy({ email });

    if (candidate) {
      throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = bcryptjs.hashSync(password, config.salt);
    const tokens = await this.utils.generateTokens(newUser.id);
    newUser.refreshToken = tokens.refreshToken;
    newUser.activationLink = uuid.v4();
    const user = await this.userRepository.save(newUser);
    delete user.password;
    delete user.refreshToken;
    return { user, tokens };

    // do a migration!!!
    // const newUser = new User();
    // newUser.email = email;
    // newUser.password = bcryptjs.hashSync(password, config.salt);
    // newUser.activationLink = uuid.v4();
    // const user = await this.userRepository.save(newUser);
    // const tokens = await this.utils.generateTokens(user.id);
    // user.refreshToken = tokens.refreshToken;
    // const userWithRefresh = await this.userRepository.save(newUser);
    // delete userWithRefresh.password;
    // delete userWithRefresh.refreshToken;
    // return { userWithRefresh, tokens };
  }
}
