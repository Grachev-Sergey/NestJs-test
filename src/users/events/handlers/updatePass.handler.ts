import type { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

import { UpdatePassEvent } from '../impl';

@EventsHandler(UpdatePassEvent)
export class UpdatePassHandler implements IEventHandler<UpdatePassEvent> {
  handle(event: UpdatePassEvent) {
    // eslint-disable-next-line no-console
    console.log('User changed pass:', event.user);
  }
}
