import type { User } from 'src/db/entities/user.entity';

export class LogOutCommand {
  constructor(public readonly user: User) {}
}
