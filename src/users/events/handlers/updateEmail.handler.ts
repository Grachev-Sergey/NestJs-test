import type { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

import { UpdateEmailEvent } from '../impl';

@EventsHandler(UpdateEmailEvent)
export class UpdateEmailHandler implements IEventHandler<UpdateEmailEvent> {
  handle(event: UpdateEmailEvent) {
    // eslint-disable-next-line no-console
    console.log(
      '!Information from the event!',
      'User changed email:',
      event.user,
      'New email:',
      event.newEmail,
    );
  }
}
