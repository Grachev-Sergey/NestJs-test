import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, CommandBus, EventBus } from '@nestjs/cqrs';

import { Utils } from 'src/utils';
import { CreateUserCommand } from 'src/users/commads/impl';
import { SignUpEvent } from 'src/auth/events/impl';

import { SignUpCommand } from '../impl';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private commandBus: CommandBus,
    private eventBus: EventBus,
    private utils: Utils,
  ) {}

  async execute(handler: SignUpCommand) {
    const { email, password } = handler;
    const user = await this.commandBus.execute(
      new CreateUserCommand(email, password),
    );
    this.eventBus.publish(new SignUpEvent(user));
    await this.utils.checkMatchPass(user.id, password);
    const token = await this.utils.generateToken(user.id);
    return { user, token };
  }
}
