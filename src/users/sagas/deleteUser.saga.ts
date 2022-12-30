import { Injectable } from '@nestjs/common';
import type { ICommand } from '@nestjs/cqrs';
import { ofType } from '@nestjs/cqrs';
import { Saga } from '@nestjs/cqrs';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestSagaCommand } from '../commads/impl';
import { DeleteUserEvent } from '../events/impl';

@Injectable()
export class DeleteUserSagas {
  @Saga()
  dragonKilled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeleteUserEvent),
      map((event) => {
        // eslint-disable-next-line no-console
        console.log(
          '!Information from the saga! User from delete event:',
          event.user,
        );
        return new TestSagaCommand(event.user.id);
      }),
    );
  };
}
