import type { User } from '../../../db/entities/user.entity';

export class ChangeRatingCommand {
  constructor(
    public readonly user: User,
    public readonly bookId: number,
    public readonly rating: number,
  ) {}
}
