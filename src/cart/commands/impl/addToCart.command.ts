import type { User } from '../../../db/entities/user.entity';

export class AddToCartCommand {
  constructor(
    public readonly user: User,
    public readonly bookId: number,
    public readonly cover: string,
    public readonly price: number,
  ) {}
}
