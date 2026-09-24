import express from "express";

import {
	getMessages,
	sendMessage,
	markMessagesAsRead,
	editMessage,
	deleteMessage,
} from "../controllers/message.controller.js";

import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get(
	"/:id",
	protectRoute,
	getMessages
);

router.post(
	"/send/:id",
	protectRoute,
	upload.single("file"),
	sendMessage
);

router.post(
	"/read/:id",
	protectRoute,
	markMessagesAsRead
);

router.put(
	"/edit/:id",
	protectRoute,
	upload.single("file"),
	editMessage
);

router.delete(
	"/delete/:id",
	protectRoute,
	deleteMessage
);

export default router;