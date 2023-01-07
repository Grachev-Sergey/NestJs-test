import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';

import { UpdateEmailCommand } from '../impl';

@CommandHandler(UpdateEmailCommand)
export class UpdateEmailHandler implements ICommandHandler<UpdateEmailCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(handler: UpdateEmailCommand): Promise<User> {
    const { newEmail, user } = handler;
    const newUser = user;
    const isEmailBusy = await this.userRepository.findOneBy({
      email: newEmail,
    });
    if (isEmailBusy) {
      throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
    }
    newUser.email = newEmail;
    await this.userRepository.save(newUser);
    return newUser;
  }
}
