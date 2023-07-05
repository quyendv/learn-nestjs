import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/schemas/note.schema';
import { User } from 'src/schemas/user.schema';
import { UserSchemaFactory } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
        inject: [getModelToken(Note.name)],
        imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
      },
    ]),
  ],
})
export class UserModule {}
