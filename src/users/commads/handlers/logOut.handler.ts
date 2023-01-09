import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';
import { LogOutCommand } from '../impl/logOut.command';

@CommandHandler(LogOutCommand)
export class LogOutHandler implements ICommandHandler<LogOutCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(handler: LogOutCommand) {
    const user = handler.user;
    user.refreshToken = '';
    await this.userRepository.save(user);
  }
}
