import { Schema, Document } from 'mongoose';

export const TeleUserSchema = new Schema({
  chatId: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  isSubscribe: { type: Boolean, required: true, default: false },
  isBlock: { type: Boolean, required: true, default: false },
  isDeleted: { type: Boolean, required: true, default: false },
  conversations: [
    {
      message: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export interface TeleUser extends Document {
  chatId: number;
  username: string;
  isSubscribe: boolean;
  isBlock: boolean;
  isDeleted: boolean;
  conversations: { message: string; timestamp?: Date }[];
}
