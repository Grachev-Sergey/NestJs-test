import type { User } from 'src/db/entities/user.entity';

export class GetBooksFromCartQuery {
  constructor(public readonly user: User) {}
}
