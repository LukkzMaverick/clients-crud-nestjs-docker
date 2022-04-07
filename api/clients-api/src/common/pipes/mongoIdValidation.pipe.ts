import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { IsMongoId, validateSync } from 'class-validator';

export class MongoIdValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value)
    const id = new MongoId(value);
    const errors = validateSync(id);
    if (errors.length > 0) {
      let messages = [];
      errors.forEach((error) => {
        Object.values(error.constraints).forEach((message) => {
          messages.push(message);
        });
      });
      throw new BadRequestException(messages);
    }
    return value;
  }
}

export class MongoId {
  constructor(id) {
    console.log(id)
    console.log(typeof id)
    this.id = id;
  }

  @IsMongoId()
  id: string;
}