import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';
import { UpdateEmailCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@CommandHandler(UpdateEmailCommand)
export class UpdateEmailHandler implements ICommandHandler<UpdateEmailCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    newUser.email = newEmail;
    await this.userRepository.save(newUser);
    return newUser;
  }
}
