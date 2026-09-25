import bcrypt from "bcryptjs";
import { Readable } from "stream";

import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../config/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
try {
const loggedInUserId = req.user._id;

const conversations =
await Conversation.find({
participants: loggedInUserId,
})
.sort({ updatedAt: -1 })
.populate({
	path: "participants",
	select: "-password",
});

const conversationUsers = [];

for (const conversation of conversations) {
const otherUser =
conversation.participants.find(
	(participant) =>
		participant._id.toString() !==
		loggedInUserId.toString()
);

if (!otherUser) {
continue;
}

const unreadCount =
await Message.countDocuments({
	senderId: otherUser._id,
	receiverId: loggedInUserId,
	status: {
		$ne: "read",
	},
});

conversationUsers.push({
...otherUser.toObject(),
conversationUpdatedAt:
	conversation.updatedAt,
unreadCount,
});
}

const conversationUserIds =
conversationUsers.map(
(user) => user._id
);

const usersWithNoConversation =
await User.find({
_id: {
	$ne: loggedInUserId,
	$nin: conversationUserIds,
},
}).select("-password");

const allUsers = [
...conversationUsers,
...usersWithNoConversation.map(
(user) => ({
	...user.toObject(),
	unreadCount: 0,
})
),
];

res.status(200).json(allUsers);
} catch (error) {
console.error(
"Error in getUsersForSidebar:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const searchUsers = async (req, res) => {
try {
const { query } = req.query;
const loggedInUserId = req.user._id;

if (!query || !query.trim()) {
return res.status(400).json({
error: "Search query is required",
});
}

const users = await User.find({
_id: { $ne: loggedInUserId },
$or: [
{
	fullName: {
		$regex: query.trim(),
		$options: "i",
	},
},
{
	username: {
		$regex: query.trim(),
		$options: "i",
	},
},
],
})
.select("-password")
.limit(10);

res.status(200).json(users);
} catch (error) {
console.error(
"Error in searchUsers:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const updateProfilePicture = async (
req,
res
) => {
try {
if (!req.file) {
return res.status(400).json({
error: "Profile picture is required",
});
}

const uploadToCloudinary = () =>
new Promise((resolve, reject) => {
const uploadStream =
	cloudinary.uploader.upload_stream(
		{
			folder: "chat-app/profile-pictures",
			resource_type: "image",
		},
		(error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		}
	);

Readable.from(
	req.file.buffer
).pipe(uploadStream);
});

const result =
await uploadToCloudinary();

const updatedUser =
await User.findByIdAndUpdate(
req.user._id,
{
	profilePic: result.secure_url,
},
{
	new: true,
}
).select("-password");

if (!updatedUser) {
return res.status(404).json({
error: "User not found",
});
}

res.status(200).json({
message:
"Profile picture updated successfully",

user: {
_id: updatedUser._id,
fullName: updatedUser.fullName,
username: updatedUser.username,
profilePic:
	updatedUser.profilePic,
},
});
} catch (error) {
console.error(
"Error in updateProfilePicture:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const changePassword = async (req, res) => {
try {
const {
currentPassword,
newPassword,
confirmPassword,
} = req.body;

if (
!currentPassword ||
!newPassword ||
!confirmPassword
) {
return res.status(400).json({
error: "All password fields are required",
});
}

if (newPassword !== confirmPassword) {
return res.status(400).json({
error: "New passwords don't match",
});
}

if (newPassword.length < 6) {
return res.status(400).json({
error:
	"New password must be at least 6 characters",
});
}

const user = await User.findById(
req.user._id
);

if (!user) {
return res.status(404).json({
error: "User not found",
});
}

const isPasswordCorrect =
await bcrypt.compare(
currentPassword,
user.password
);

if (!isPasswordCorrect) {
return res.status(400).json({
error: "Current password is incorrect",
});
}

const isSamePassword =
await bcrypt.compare(
newPassword,
user.password
);

if (isSamePassword) {
return res.status(400).json({
error:
	"New password must be different from current password",
});
}

const salt = await bcrypt.genSalt(10);

const hashedPassword =
await bcrypt.hash(
newPassword,
salt
);

user.password = hashedPassword;

await user.save();

res.status(200).json({
message: "Password changed successfully",
});
} catch (error) {
console.error(
"Error in changePassword:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};