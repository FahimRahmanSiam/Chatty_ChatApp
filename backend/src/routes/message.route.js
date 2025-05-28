import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller.js";

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar)  //make sure only authenticated users are allowed in the chat
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessages)

export default router