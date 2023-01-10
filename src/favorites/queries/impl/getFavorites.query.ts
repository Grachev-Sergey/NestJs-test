import type { User } from 'src/db/entities/user.entity';

export class GetFavorites {
  constructor(public readonly user: User) {}
}
