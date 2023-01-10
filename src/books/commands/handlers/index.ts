import { AddBookHandler } from './addBook.handler';
import { DeleteBookHandler } from './deleteBook.command';
import { UpdateBookHandler } from './updateBook.handler';

export const CommandHandlers = [
  AddBookHandler,
  UpdateBookHandler,
  DeleteBookHandler,
];
