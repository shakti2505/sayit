import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import User from "./userModal.js";

const chatGroup = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(), 
  },
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    onDelete: "CASCADE", 
    required: true,
  },
  passcode: {
    type: String,
    required: true,
    minLength: 6,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Create an index on `createdAt` field (ascending order to get older items first)
chatGroup.index({ createdAt: 1 });

const ChatGroupModal = mongoose.model("ChatGroupModal", chatGroup);
export default ChatGroupModal;
