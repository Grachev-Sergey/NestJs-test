import { GetAllUsersHandler } from './getAllUsers.handler';
import { GetUserByIdHandler } from './getUserById.handler';
import { GetUserByEmailHandler } from './getUserByEmail.handler';

export const QueryHandlers = [
  GetAllUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
];
