import mongoose from "mongoose";
import ChatGroupModal from "./chatGroupModal.js";
import UserModal from "./userModal.js";

const groupUsers = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModal,
    required: true,
  },
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
