import type { User } from 'src/db/entities/user.entity';

export class DeleteUserEvent {
  constructor(public readonly user: User) {}
}
