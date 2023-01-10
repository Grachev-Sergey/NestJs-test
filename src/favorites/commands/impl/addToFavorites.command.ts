import type { User } from '../../../db/entities/user.entity';

export class AddToFavoritesCommand {
  constructor(public readonly user: User, public readonly bookId: number) {}
}
