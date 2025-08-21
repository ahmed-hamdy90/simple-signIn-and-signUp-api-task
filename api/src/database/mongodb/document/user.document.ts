import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * User Document class to define MongoDb Schema
 */
@Schema()
export class UserDocument extends Document {

  @Prop({ required: true, unique: true })
  userId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true})
  password: string;

  @Prop({ default: false })
  isDeleted: boolean;
}
