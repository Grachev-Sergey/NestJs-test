import type { User } from 'src/db/entities/user.entity';

export class UpdatePassEvent {
  constructor(public readonly user: User) {}
}
