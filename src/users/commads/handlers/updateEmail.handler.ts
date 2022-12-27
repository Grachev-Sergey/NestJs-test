import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/db/entities/user.entity';
import { UpdateEmailEvent } from 'src/users/events/impl';

import { UpdateEmailCommand } from '../impl';

@CommandHandler(UpdateEmailCommand)
export class UpdateEmailHandler implements ICommandHandler<UpdateEmailCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
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
    this.eventBus.publish(new UpdateEmailEvent(user, newEmail));
    newUser.email = newEmail;
    await this.userRepository.save(newUser);
    return newUser;
  }
}
