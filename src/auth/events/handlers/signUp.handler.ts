import type { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

import { SignUpEvent } from '../impl';

@EventsHandler(SignUpEvent)
export class SignUpUserHandler implements IEventHandler<SignUpEvent> {
  handle(event: SignUpEvent) {
    // eslint-disable-next-line no-console
    console.log(
      '!Information from the event! New user registered:',
      event.user,
    );
  }
}
