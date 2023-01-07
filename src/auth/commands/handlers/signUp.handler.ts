import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, CommandBus, EventBus } from '@nestjs/cqrs';

import { Utils } from '../../../utils';
import { CreateUserCommand } from '../../../users/commads/impl';
import { SignUpEvent } from '../../../auth/events/impl';

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
    const userWithTokens = await this.commandBus.execute(
      new CreateUserCommand(email, password),
    );
    this.eventBus.publish(new SignUpEvent(userWithTokens.user));
    return userWithTokens;
  }
}
