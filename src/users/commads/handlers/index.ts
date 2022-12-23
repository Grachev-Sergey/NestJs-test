import { UpdateEmailHandler } from './updateEmail.handler';
import { DeleteUserHandler } from './deleteUser.handler';
import { UpdatePassHandler } from './updatePass.handler';

export const CommandHandlers = [
  UpdateEmailHandler,
  UpdatePassHandler,
  DeleteUserHandler,
];
