import type { User } from '../../../db/entities/user.entity';

export class RemoveAllBooksFromCartCommand {
  constructor(public readonly user: User) {}
}
