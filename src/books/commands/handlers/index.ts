import { AddBookHandler } from './addBook.handler';
import { DeleteBookHandler } from './deleteBook.handler';
import { UpdateBookHandler } from './updateBook.handler';

export const CommandHandlers = [
  AddBookHandler,
  UpdateBookHandler,
  DeleteBookHandler,
];
