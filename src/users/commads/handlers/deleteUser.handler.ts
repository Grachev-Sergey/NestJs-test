// import { HttpException, HttpStatus } from '@nestjs/common';
import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, EventBus, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/db/entities/user.entity';
import { DeleteUserEvent } from 'src/users/events/impl';

import { DeleteUserCommand } from '../impl';
import { GetUserByIdQuery } from 'src/users/queries/impl';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventBus: EventBus,
    private queryBus: QueryBus,
  ) {}

  async execute(handler: DeleteUserCommand) {
    const { userId } = handler;
    const user = await this.queryBus.execute(new GetUserByIdQuery(userId));
    this.eventBus.publish(new DeleteUserEvent(user));
    await this.userRepository.remove(user);
  }
}
