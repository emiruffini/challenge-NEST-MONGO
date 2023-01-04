import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  //Make address an object including all the required fields
  @Prop()
  address: string;

  @Prop()
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
