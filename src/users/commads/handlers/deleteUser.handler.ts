import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/db/entities/user.entity';

import { DeleteUserCommand } from '../impl';
import { GetUserByIdQuery } from 'src/users/queries/impl';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private queryBus: QueryBus,
  ) {}

  async execute(handler: DeleteUserCommand) {
    const { userId } = handler;
    const user = await this.queryBus.execute(new GetUserByIdQuery(userId));
    await this.userRepository.remove(user);
  }
}
