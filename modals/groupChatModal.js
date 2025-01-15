import mongoose from "mongoose";
import ChatGroupModal from "./chatGroupModal.js";

const groupChatSchema = new mongoose.Schema({
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ChatGroupModal,
    required: true,
  },
  message: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

groupChatSchema.index({ createdAt: 1 });

const groupChatModal = mongoose.model("Group chats", groupChatSchema);
export default groupChatModal;
