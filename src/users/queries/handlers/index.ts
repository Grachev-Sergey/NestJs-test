import { GetAllUsersHandler } from './getAllUsers.handler';
import { GetUserByIdHandler } from './getUserById.handler';
import { GetUserByEmailHandler } from './getUserByEmail.handler';
import { GetMeHandler } from './getMe.handler';

export const QueryHandlers = [
  GetAllUsersHandler,
  GetUserByIdHandler,
  GetUserByEmailHandler,
  GetMeHandler,
];
