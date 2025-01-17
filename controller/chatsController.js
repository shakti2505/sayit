import groupChatModal from "../modals/groupChatModal.js";

export const getGroupChats = async (req, res) => {
  try {
    const { group_id } = req.params;
    const chats = await groupChatModal.find({ group_id: group_id });
    return res.status(200).json({ message: "chats found", data: chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};



