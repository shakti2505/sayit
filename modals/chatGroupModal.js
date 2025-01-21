import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import User from "./userModal.js";

const chatGroup = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
    minLength: 6,
  },
  members: {
    type: Array,
    default: [],
    required: true,
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
