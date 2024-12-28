import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import ChatGroupModal from "./chatGroupModal";

const groupUsers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chatgroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ChatGroupModal,
    onDelete: "CASCADE",
    required: true,
  },
  group_id: {
    type: String,
    required: true,
    unique: true,
    default: () => uuidv4(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const GroupUsersModal = mongoose.model("GroupUsersModal", groupUsers);
export default GroupUsersModal;
