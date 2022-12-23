import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdatePassCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import config from 'src/config';
import { CheckMatchPasswords } from 'src/utils/checkMatchPasswords';

@CommandHandler(UpdatePassCommand)
export class UpdatePassHandler implements ICommandHandler<UpdatePassCommand> {
  constructor(
    private checkMatchPasswords: CheckMatchPasswords,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(handler: UpdatePassCommand): Promise<User> {
    const { user, password, newPassword } = handler;
    // eslint-disable-next-line no-console
    console.log('ITS WORKS');
    const changeableUser = user;
    await this.checkMatchPasswords.checkMatchPass(changeableUser.id, password);
    changeableUser.password = bcryptjs.hashSync(newPassword, config.salt);
    await this.userRepository.save(changeableUser);
    delete changeableUser.password;
    return changeableUser;
  }
}
