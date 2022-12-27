import type { User } from 'src/db/entities/user.entity';

export class SignUpEvent {
  constructor(public readonly user: User) {}
}
