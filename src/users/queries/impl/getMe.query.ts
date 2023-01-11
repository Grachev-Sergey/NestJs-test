import type { User } from 'src/db/entities/user.entity';

export class GetMeQuery {
  constructor(public readonly user: User) {}
}
