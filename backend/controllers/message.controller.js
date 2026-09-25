import { Readable } from "stream";

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../config/cloudinary.js";

import {
getReceiverSocketId,
io,
} from "../socket/socket.js";

const uploadToCloudinary = (
file,
messageType
) =>
new Promise((resolve, reject) => {
const resourceType =
messageType === "file"
? "raw"
: "image";

const uploadStream =
cloudinary.uploader.upload_stream(
{
folder: "chat-app/messages",
resource_type: resourceType,
},
(error, result) => {
if (error) {
reject(error);
} else {
resolve(result);
}
}
);

Readable.from([file.buffer]).pipe(
uploadStream
);
});

export const sendMessage = async (req, res) => {
try {
const { message, replyTo } = req.body;
const { id: receiverId } = req.params;
const senderId = req.user._id;

let messageType = "text";
let fileUrl = null;
let fileName = null;
let fileType = null;

if (req.file) {
fileName = req.file.originalname;
fileType = req.file.mimetype;

if (
req.file.mimetype.startsWith(
"image/"
)
) {
messageType =
req.file.mimetype ===
"image/gif"
? "gif"
: "image";
} else {
messageType = "file";
}

const result =
await uploadToCloudinary(
req.file,
messageType
);

fileUrl = result.secure_url;
}

if (
messageType === "text" &&
(!message || !message.trim())
) {
return res.status(400).json({
error: "Message cannot be empty",
});
}

if (
messageType !== "text" &&
!req.file
) {
return res.status(400).json({
error: "File is required",
});
}

let conversation =
await Conversation.findOne({
participants: {
$all: [
senderId,
receiverId,
],
},
});

if (!conversation) {
conversation =
await Conversation.create({
participants: [
senderId,
receiverId,
],
});
}

const newMessage = new Message({
senderId,
receiverId,
message:
messageType === "text"
? message.trim()
: "",
messageType,
fileUrl,
fileName,
fileType,
replyTo: replyTo || null,
status: "sent",
});

conversation.messages.push(
newMessage._id
);

await Promise.all([
conversation.save(),
newMessage.save(),
]);

const receiverSocketId =
getReceiverSocketId(receiverId);

if (receiverSocketId) {
newMessage.status = "delivered";

await newMessage.save();
}

if (newMessage.replyTo) {
await newMessage.populate({
path: "replyTo",
select:
"message senderId receiverId createdAt messageType fileUrl fileName",
});
}

const senderSocketId =
getReceiverSocketId(
senderId.toString()
);

if (receiverSocketId) {
io.to(receiverSocketId).emit(
"newMessage",
newMessage.toObject()
);

io.to(receiverSocketId).emit(
"conversationActivity",
{
userId:
senderId.toString(),
}
);

io.emit("messageDelivered", {
messageId:
newMessage._id,
});
}

if (senderSocketId) {
io.to(senderSocketId).emit(
"conversationActivity",
{
userId:
receiverId.toString(),
}
);
}

res.status(201).json(
newMessage
);
} catch (error) {
console.log(
"Error in sendMessage controller:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const getMessages = async (req, res) => {
try {
const {
id: userToChatId,
} = req.params;

const senderId =
req.user._id;

const conversation =
await Conversation.findOne({
participants: {
$all: [
senderId,
userToChatId,
],
},
}).populate({
path: "messages",
populate: {
path: "replyTo",
select:
"message senderId receiverId createdAt messageType fileUrl fileName",
},
});

if (!conversation) {
return res.status(200).json([]);
}

const messages =
conversation.messages;

res.status(200).json(messages);
} catch (error) {
console.log(
"Error in getMessages controller:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const markMessagesAsRead = async (
req,
res
) => {
try {
const {
id: senderId,
} = req.params;

const receiverId =
req.user._id;

const messages =
await Message.find({
senderId,
receiverId,
status: {
$ne: "read",
},
}).select("_id");

if (messages.length === 0) {
return res.status(200).json({
message:
"No unread messages",
updatedCount: 0,
});
}

await Message.updateMany(
{
senderId,
receiverId,
status: {
$ne: "read",
},
},
{
$set: {
status: "read",
},
}
);

const senderSocketId =
getReceiverSocketId(
senderId
);

if (senderSocketId) {
io.to(senderSocketId).emit(
"messageRead",
{
messageIds:
messages.map(
(message) =>
message._id
),
}
);
}

res.status(200).json({
message:
"Messages marked as read",
updatedCount:
messages.length,
});
} catch (error) {
console.log(
"Error in markMessagesAsRead:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const editMessage = async (
req,
res
) => {
try {
const {
id: messageId,
} = req.params;

const userId =
req.user._id;

const message =
typeof req.body.message ===
"string"
? req.body.message.trim()
: "";

const removeAttachment =
req.body.removeAttachment ===
"true";

const existingMessage =
await Message.findById(
messageId
);

if (!existingMessage) {
return res.status(404).json({
error:
"Message not found",
});
}

if (
existingMessage.senderId.toString() !==
userId.toString()
) {
return res.status(403).json({
error:
"You can only edit your own messages",
});
}

if (req.file) {
let messageType;

if (
req.file.mimetype.startsWith(
"image/"
)
) {
messageType =
req.file.mimetype ===
"image/gif"
? "gif"
: "image";
} else {
messageType = "file";
}

const result =
await uploadToCloudinary(
req.file,
messageType
);

existingMessage.fileUrl =
result.secure_url;

existingMessage.fileName =
req.file.originalname;

existingMessage.fileType =
req.file.mimetype;

existingMessage.messageType =
messageType;
} else if (removeAttachment) {
existingMessage.fileUrl = null;
existingMessage.fileName = null;
existingMessage.fileType = null;
existingMessage.messageType =
"text";
}

if (
existingMessage.messageType ===
"text" &&
!message
) {
return res.status(400).json({
error:
"Message cannot be empty",
});
}

existingMessage.message =
message;

existingMessage.edited =
true;

await existingMessage.save();

if (existingMessage.replyTo) {
await existingMessage.populate({
path: "replyTo",
select:
"message senderId receiverId createdAt messageType fileUrl fileName",
});
}

const updatedMessage =
existingMessage.toObject();

const receiverSocketId =
getReceiverSocketId(
existingMessage.receiverId.toString()
);

if (receiverSocketId) {
io.to(receiverSocketId).emit(
"messageEdited",
{
message:
updatedMessage,
}
);
}

res.status(200).json(
updatedMessage
);
} catch (error) {
console.log(
"Error in editMessage controller:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};

export const deleteMessage = async (
req,
res
) => {
try {
const {
id: messageId,
} = req.params;

const userId =
req.user._id;

const message =
await Message.findById(
messageId
);

if (!message) {
return res.status(404).json({
error:
"Message not found",
});
}

if (
message.senderId.toString() !==
userId.toString()
) {
return res.status(403).json({
error:
"You can only delete your own messages",
});
}

await Conversation.updateOne(
{
messages: messageId,
},
{
$pull: {
messages: messageId,
},
}
);

await Message.findByIdAndDelete(
messageId
);

const receiverSocketId =
getReceiverSocketId(
message.receiverId.toString()
);

if (receiverSocketId) {
io.to(receiverSocketId).emit(
"messageDeleted",
{
messageId,
}
);
}

res.status(200).json({
message:
"Message deleted successfully",
messageId,
});
} catch (error) {
console.log(
"Error in deleteMessage controller:",
error.message
);

res.status(500).json({
error: "Internal server error",
});
}
};