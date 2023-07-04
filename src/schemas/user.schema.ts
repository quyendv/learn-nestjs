import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptions } from 'src/configs/schema.config';
import { Note } from './note.schema';

@Schema(schemaOptions)
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  password: string;

  @Prop([Note]) // should be explicit type if arrays, nested object, ...
  notes: Note[];
}

export const UserSchema = SchemaFactory.createForClass(User);
