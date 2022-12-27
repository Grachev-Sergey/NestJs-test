import type { ICommandHandler } from '@nestjs/cqrs';
import { CommandHandler } from '@nestjs/cqrs';

import { TestSagaCommand } from '../impl';

@CommandHandler(TestSagaCommand)
export class TestSagaHandler implements ICommandHandler<TestSagaCommand> {
  async execute(handler: TestSagaCommand) {
    const { userId } = handler;
    // eslint-disable-next-line no-console
    console.log('Command launched by saga', userId);
  }
}
