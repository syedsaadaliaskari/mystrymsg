import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdBy: string;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  isVerified: boolean;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  messages: Message[];
}

export const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required "],
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required "],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: [true, "Verification code is necessary"],
  },
  verifyCodeExpiry: {
    type: Date,
    default: Date.now(),
  },
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
