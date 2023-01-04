import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import validator from 'validator';
import mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<any, mongoose.Types.ObjectId>
{
  transform(value: any): mongoose.Types.ObjectId {
    const validObjectId: boolean =
      mongoose.isObjectIdOrHexString(value) || validator.isUUID(value);
    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return value;
  }
}
