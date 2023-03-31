import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "user name required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email required"],
    lowercase: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: [true, "password required"],
    minLength: 8,
  },
});

const messageBoardSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  chats: {
    withWho: {
      type: Array,
    },
  },
  userId: {
    type: ObjectId,
  },
});

const messageSchema = new mongoose.Schema({
  createdBy: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  message: {
    type: String,
  },
  messageId: {
    type: ObjectId,
  },
});

export const User =
  mongoose.models.profiles || mongoose.model("profiles", userSchema);

export const MessageBoard =
  mongoose.models.messageboards ||
  mongoose.model("messageboards", messageBoardSchema);
