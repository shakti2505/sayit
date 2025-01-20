import express from "express";
import {
  createGroup,
  deleteGroup,
  generate_group_link,
  getAllGroupOfUser,
  getGroupById,
  updateGroup,
} from "../controller/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getGroupUsers,
  storeUsersInGroup,
} from "../controller/chatGroupUserController.js";
import { getGroupChats } from "../controller/chatsController.js";

const router = express.Router();

// chat group route

router.post("/create-chat-group", authMiddleware, createGroup);

// getAllGroupOfUser

router.get("/chat-groups", authMiddleware, getAllGroupOfUser);

// get group by Id

router.get("/chat-group/:id", getGroupById);

// update group
router.put("/chat-group-update/:id", authMiddleware, updateGroup);

// delete group

router.delete("/delete-group/:id", authMiddleware, deleteGroup);

// chat group Users
router.get("/chat-group-users/:group_id", getGroupUsers);

router.post("/create-chat-group-user", storeUsersInGroup);

// group chats route
router.get("/get-group-chats/:group_id", getGroupChats);

// generate link route
router.post('/generate-group-link/:group_id', generate_group_link);
export default router;
