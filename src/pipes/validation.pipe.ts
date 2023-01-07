import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { ValidationException } from '../expections/ValidationException';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ): Promise<unknown> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map((item) => {
        return {
          path: item.property,
          errors: `${Object.values(item.constraints).join(', ')}`,
        };
      });
      throw new ValidationException(messages);
    }
    return value;
  }
}
