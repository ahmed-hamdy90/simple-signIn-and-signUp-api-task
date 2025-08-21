// src/users/schemas/user.schema.ts
import { SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from '../document/user.document';

/**
 * User Schema
 */
export const UserSchema = SchemaFactory.createForClass(UserDocument);