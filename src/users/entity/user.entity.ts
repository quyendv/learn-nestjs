import { NextFunction } from 'express';
import { Model } from 'mongoose';
import { Note } from 'src/schemas/note.schema';
import { UserSchema } from 'src/schemas/user.schema';

export const UserSchemaFactory = (noteModel: Model<Note>) => {
  const user_schema = UserSchema;

  user_schema.pre('findOneAndDelete', async function (next: NextFunction) {
    // OTHER USEFUL METHOD: getOptions, getPopulatedPaths, getQuery = getFilter, getUpdate
    const user = await this.model.findOne(this.getFilter()); // not use ArrowFn wrapper -> no context

    await noteModel.deleteMany({ user: user._id });
    return next();
  });

  return user_schema;
};
