import { HttpException, HttpStatus } from '@nestjs/common';

type ErrorsType = {
  path: string;
  errors: string;
};

export class ValidationException extends HttpException {
  messages: ErrorsType[];

  constructor(messages: ErrorsType[]) {
    super(messages, HttpStatus.BAD_REQUEST);
  }
}
