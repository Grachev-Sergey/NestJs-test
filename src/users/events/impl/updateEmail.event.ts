import type { User } from 'src/db/entities/user.entity';

export class UpdateEmailEvent {
  constructor(public readonly user: User, public readonly newEmail: string) {}
}
