import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler, CommandBus } from '@nestjs/cqrs';

import { SignUpCommand } from '../impl';
import { Utils } from 'src/utils';
import { CreateUserCommand } from 'src/users/commads/impl';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(private commandBus: CommandBus, private utils: Utils) {}

  async execute(handler: SignUpCommand) {
    const { email, password } = handler;
    const user = await this.commandBus.execute(
      new CreateUserCommand(email, password),
    );
    await this.utils.checkMatchPass(user.id, password);
    const token = await this.utils.generateToken(user.id);
    return { user, token };
  }
}
