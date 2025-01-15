import express from "express";
import { googleLogin } from "../controller/authControler.js";
import {
  createGroup,
  deleteGroup,
  getAllGroupOfUser,
  getGroupById,
  updateGroup,
} from "../controller/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// auth route
router.get("/google", googleLogin);

// chat group route

// router.post("/create-chat-group", authMiddleware, createGroup);

// // getAllGroupOfUser

// router.get("/chat-groups", authMiddleware, getAllGroupOfUser);

// // get group by Id

// router.get("/chat-group/:id", authMiddleware, getGroupById);

// // update group
// router.put("/chat-group-update/:id", authMiddleware, updateGroup);

// // delete group

// router.delete("/delete-group/:id", authMiddleware, deleteGroup);
export default router;
