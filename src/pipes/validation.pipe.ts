import type { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import ValidationExpection from 'src/expections/ValidationExpection';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length) {
      const payload = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      // eslint-disable-next-line no-console
      console.log(payload);
      const str = payload.join();
      throw new ValidationExpection(str, 400);
    }
    return value;
  }
}
