import { HttpException } from '@nestjs/common';

class ValidationExpection extends HttpException {
  message: string;
  statuss: number;
  // payload: unknown;
  constructor(message: string, statuss: number) {
    super(message, statuss);
    // this.payload = payload;
  }
}

export default ValidationExpection;
