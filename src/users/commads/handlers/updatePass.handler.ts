import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { User } from 'src/db/entities/user.entity';
import config from 'src/config';
import { Utils } from 'src/utils';
import { UpdatePassEvent } from 'src/users/events/impl';

import { UpdatePassCommand } from '../impl';

@CommandHandler(UpdatePassCommand)
export class UpdatePassHandler implements ICommandHandler<UpdatePassCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utils: Utils,
    private eventBus: EventBus,
  ) {}

  async execute(handler: UpdatePassCommand): Promise<User> {
    const { user, password, newPassword } = handler;
    const changeableUser = user;
    await this.utils.checkMatchPass(changeableUser.id, password);
    changeableUser.password = bcryptjs.hashSync(newPassword, config.salt);
    await this.userRepository.save(changeableUser);
    delete changeableUser.password;
    this.eventBus.publish(new UpdatePassEvent(user));
    return changeableUser;
  }
}