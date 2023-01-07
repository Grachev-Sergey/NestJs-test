import type { Request } from 'express';
import type { User } from '../db/entities/user.entity';

interface IRequestWithUser extends Request {
  user: User;
}

export default IRequestWithUser;
