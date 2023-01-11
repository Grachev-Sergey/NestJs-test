import type { User } from 'src/db/entities/user.entity';

export class UpdateInfoCommand {
  constructor(
    public readonly user: User,
    public readonly email: string,
    public readonly fullName: string,
  ) {}
}
