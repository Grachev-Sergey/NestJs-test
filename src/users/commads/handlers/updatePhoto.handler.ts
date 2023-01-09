import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as fs from 'node:fs/promises';

import { User } from '../../../db/entities/user.entity';

import { UpdatePhotoCommand } from '../impl';

@CommandHandler(UpdatePhotoCommand)
export class UpdatePhotoHandler implements ICommandHandler<UpdatePhotoCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(handler: UpdatePhotoCommand): Promise<User> {
    const { user, avatar } = handler;

    const userId = user.id;

    const avatarData = avatar.split('base64,')[1];
    const avatarType = avatar.split(';')[0].split('/')[1];
    const randomName = uuid.v4();
    const avatarName = `${randomName}.${avatarType}`;
    const route = `static/avatars/${avatarName}`;

    if (user.avatar) {
      const oldName = user.avatar;
      fs.unlink(`static/${oldName.slice(22)}`);
    }
    fs.writeFile(route, avatarData, { encoding: 'base64' });

    user.avatar = avatarName;
    await this.userRepository.save(user);

    const userWithNewAvatar = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();
    return userWithNewAvatar;
  }
}
