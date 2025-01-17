import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import ChatGroupModal from "./chatGroupModal.js";

const groupUsers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chatgroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ChatGroupModal,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const GroupUsersModal = mongoose.model("GroupUsersModal", groupUsers);
export default GroupUsersModal;
