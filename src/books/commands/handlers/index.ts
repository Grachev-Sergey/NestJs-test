import { AddBookCommand, DeleteBookCommand, UpdateBookCommand } from '../impl';

export const CommandHandlers = [
  AddBookCommand,
  UpdateBookCommand,
  DeleteBookCommand,
];
