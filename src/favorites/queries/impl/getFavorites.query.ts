import type { User } from '../../../db/entities/user.entity';

export class GetFavorites {
  constructor(public readonly user: User) {}
}
