export const schemaOptions = {
  versionKey: false, // remove key __v: ...
  timestamps: true,

  toJSON: {
    virtuals: true,
    getters: true,
  },

  toObject: {
    virtuals: true,
    getters: true,
  },
};
