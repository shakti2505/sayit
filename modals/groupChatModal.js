import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema({
  chat_groupUUID: {
    type: String,
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
