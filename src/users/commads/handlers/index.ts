import { UpdateEmailHandler } from './updateEmail.handler';
import { DeleteUserHandler } from './deleteUser.handler';
import { UpdatePassHandler } from './updatePass.handler';
import { CreateUserHandler } from './createUser.handler';

export const CommandHandlers = [
  UpdateEmailHandler,
  UpdatePassHandler,
  DeleteUserHandler,
  CreateUserHandler,
];
