import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';
import { Repository } from 'typeorm';

import { Utils } from '../../../utils';
import { GetUserByEmailQuery } from '../../../users/queries/impl';

import { SignInCommand } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../db/entities/user.entity';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private queryBus: QueryBus,
    private utils: Utils,
  ) {}

  async execute(handler: SignInCommand) {
    const { email, password } = handler;
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
    await this.utils.checkMatchPass(user.id, password);
    const tokens = await this.utils.generateTokens(user.id);
    user.refreshToken = tokens.refreshToken;
    await this.userRepository.save(user);
    delete user.refreshToken;
    return { user, tokens };
  }
}
