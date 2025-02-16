import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  picture: { type: String, required: true },
  accessToken: { type: String, required: true },
});

export interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

