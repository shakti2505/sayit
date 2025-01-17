import mongoose from "mongoose";
import UserModal from "./userModal.js";

const groupChatSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModal,
    required: true,
  },
  group_id: {
    type: String,
    required: true,
  },
  message: String,
  name: String,
  isRead: {
    type: Boolean,
    required: true,
    default:false,
  },
  isReceived: {
    type: Boolean,
    required: true,
    default:false
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

groupChatSchema.index({ createdAt: 1 });

const groupChatModal = mongoose.model("Group chats", groupChatSchema);
export default groupChatModal;
