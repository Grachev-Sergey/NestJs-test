import type { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

import { DeleteUserEvent } from '../impl';

@EventsHandler(DeleteUserEvent)
export class DeleteUserHandler implements IEventHandler<DeleteUserEvent> {
  handle(event: DeleteUserEvent) {
    // eslint-disable-next-line no-console
    console.log('User has been deleted:', event.user);
  }
}
