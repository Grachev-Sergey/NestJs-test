import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, QueryBus, EventBus } from '@nestjs/cqrs';

import { Utils } from 'src/utils';
import { GetUserByEmailQuery } from 'src/users/queries/impl';
import { SignInEvent } from 'src/auth/events/impl/signIn.event';

import { SignInCommand } from '../impl';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private queryBus: QueryBus,
    private utils: Utils,
    private eventBus: EventBus,
  ) {}

  async execute(handler: SignInCommand) {
    const { email, password } = handler;
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
    await this.utils.checkMatchPass(user.id, password);
    this.eventBus.publish(new SignInEvent(user));
    const token = await this.utils.generateToken(user.id);
    return { user, token };
  }
}
