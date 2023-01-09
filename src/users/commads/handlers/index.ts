import { UpdateInfoHandler } from './updateInfo.handler';
import { DeleteUserHandler } from './deleteUser.handler';
import { UpdatePassHandler } from './updatePass.handler';
import { CreateUserHandler } from './createUser.handler';
import { LogOutHandler } from './logOut.handler';
import { UpdatePhotoHandler } from './updatePhoto.handler';

export const CommandHandlers = [
  UpdateInfoHandler,
  UpdatePassHandler,
  UpdatePhotoHandler,
  DeleteUserHandler,
  CreateUserHandler,
  LogOutHandler,
];
