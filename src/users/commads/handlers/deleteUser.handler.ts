import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/db/entities/user.entity';
import { DeleteUserEvent } from 'src/users/events/impl';

import { DeleteUserCommand } from '../impl';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
  ) {}

  async execute(handler: DeleteUserCommand) {
    const { userId } = handler;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.eventBus.publish(new DeleteUserEvent(user));
    await this.userRepository.remove(user);
  }
}
