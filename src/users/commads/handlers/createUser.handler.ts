import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import config from 'src/config';
import { User } from 'src/db/entities/user.entity';
import { CreateUserCommand } from '../impl';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(handler: CreateUserCommand) {
    const { email, password } = handler;
    const candidate = await this.userRepository.findOneBy({ email });

    if (candidate) {
      throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.email = email;
    user.password = bcryptjs.hashSync(password, config.salt);
    const newUser = await this.userRepository.save(user);
    delete newUser.password;

    return newUser;
  }
}
