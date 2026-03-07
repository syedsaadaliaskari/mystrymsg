import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  isVerified: boolean;
  password: string;
  verifyCode: string;
  isAcceptingMessages: boolean;
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
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use the valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required "],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    required: [true, "It is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification code is necessary"],
  },
  messages: [MessageSchema],
  verifyCodeExpiry: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
