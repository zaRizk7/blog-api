import { Schema } from 'mongoose';
import validator from 'validator';

export default new Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: validator.isEmail,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
