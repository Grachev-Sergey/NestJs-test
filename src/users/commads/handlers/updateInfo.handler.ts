import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../../../db/entities/user.entity';

import { UpdateInfoCommand } from '../impl';

@CommandHandler(UpdateInfoCommand)
export class UpdateInfoHandler implements ICommandHandler<UpdateInfoCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(handler: UpdateInfoCommand): Promise<User> {
    const { newEmail, fullName, user } = handler;
    const newUser = user;
    const userId = user.id;

    if (fullName) {
      user.fullName = fullName;
    }
    if (newEmail) {
      const isEmailBusy = await this.userRepository.findOneBy({
        email: newEmail,
      });
      if (isEmailBusy) {
        throw new HttpException('Email is used', HttpStatus.BAD_REQUEST);
      }
      user.email = newEmail;
    }

    await this.userRepository.save(newUser);
    const userWithNewInfo = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();
    return userWithNewInfo;
  }
}
