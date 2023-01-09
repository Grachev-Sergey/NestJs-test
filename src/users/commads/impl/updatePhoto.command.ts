import type { User } from 'src/db/entities/user.entity';

export class UpdatePhotoCommand {
  constructor(public readonly user: User, public readonly avatar: string) {}
}
