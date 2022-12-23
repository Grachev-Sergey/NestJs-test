import type { User } from 'src/db/entities/user.entity';

export class UpdatePassCommand {
  constructor(
    public readonly user: User,
    public readonly password: string,
    public readonly newPassword: string,
  ) {}
}
