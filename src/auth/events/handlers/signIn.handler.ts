import type { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

import { SignInEvent } from '../impl';

@EventsHandler(SignInEvent)
export class SignInUserHandler implements IEventHandler<SignInEvent> {
  handle(event: SignInEvent) {
    // eslint-disable-next-line no-console
    console.log('!Information from the event! User is authorized:', event.user);
  }
}
