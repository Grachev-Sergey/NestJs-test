import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, QueryBus } from '@nestjs/cqrs';

import { SignInCommand } from '../impl';
import { Utils } from 'src/utils';
import { GetUserByEmailQuery } from 'src/users/queries/impl';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(private queryBus: QueryBus, private utils: Utils) {}

  async execute(handler: SignInCommand) {
    const { email, password } = handler;
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
    await this.utils.checkMatchPass(user.id, password);
    const token = await this.utils.generateToken(user.id);
    return { user, token };
  }
}
