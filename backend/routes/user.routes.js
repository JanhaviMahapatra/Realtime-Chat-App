import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/upload.middleware.js";

import {
	getUsersForSidebar,
	searchUsers,
	updateProfilePicture,
	changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get(
	"/",
	protectRoute,
	getUsersForSidebar
);

router.get(
	"/search",
	protectRoute,
	searchUsers
);

router.put(
	"/profile-picture",
	protectRoute,
	upload.single("profilePic"),
	updateProfilePicture
);

router.put(
	"/change-password",
	protectRoute,
	changePassword
);

export default router;