export const schemaOptions = {
  versionKey: false, // remove key __v: ...
  timestamps: true,

  // toJSON: {
  //   virtuals: true,
  //   transform: (_, obj) => {
  //     delete obj._id;
  //     return obj;
  //   },
  // },

  // toObject: {
  //   virtuals: true,
  //   transform: (_, obj) => {
  //     delete obj._id;
  //     return obj;
  //   },
  // },
};
