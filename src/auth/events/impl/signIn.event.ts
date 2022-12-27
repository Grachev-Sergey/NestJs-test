import type { User } from 'src/db/entities/user.entity';

export class SignInEvent {
  constructor(public readonly user: User) {}
}
