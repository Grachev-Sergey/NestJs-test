import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { User } from '../../../db/entities/user.entity';

import config from '../../../config';
import { Utils } from '../../../utils';

import { UpdatePassCommand } from '../impl';

@CommandHandler(UpdatePassCommand)
export class UpdatePassHandler implements ICommandHandler<UpdatePassCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private utils: Utils,
  ) {}

  async execute(handler: UpdatePassCommand): Promise<User> {
    const { user, password, newPassword } = handler;
    const changeableUser = user;
    const userId = user.id;
    await this.utils.checkMatchPass(changeableUser.id, password);
    changeableUser.password = bcryptjs.hashSync(newPassword, config.salt);
    await this.userRepository.save(changeableUser);
    delete changeableUser.password;

    const userWithNewPass = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();
    return userWithNewPass;
  }
}
