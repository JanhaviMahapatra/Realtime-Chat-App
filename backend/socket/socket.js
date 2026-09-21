import { Server } from "socket.io";
import http from "http";
import express from "express";

import User from "../models/user.model.js";
import Message from "../models/message.model.js";

const app = express();

const server = http.createServer(app);

const allowedOrigins = [
	"http://localhost:3000",
	process.env.FRONTEND_URL,
].filter(Boolean);


const io = new Server(server, {
	cors: {
		origin:allowedOrigins,
		methods: ["GET", "POST"],
	},
});

const userSocketMap = new Map();

export const getReceiverSocketId = (receiverId) => {
	const sockets = userSocketMap.get(receiverId);

	if (!sockets || sockets.size === 0) {
		return null;
	}

	return [...sockets][0];
};

io.on("connection", async (socket) => {
console.log("User connected:", socket.id);

const userId = socket.handshake.query.userId;

if (userId && userId !== "undefined") {
if (!userSocketMap.has(userId)) {
	userSocketMap.set(userId, new Set());
}

userSocketMap.get(userId).add(socket.id);
}

// Send currently online users to all clients
io.emit("getOnlineUsers", [...userSocketMap.keys()]);

// Mark previously sent messages as delivered
if (userId && userId !== "undefined") {
try {
	const pendingMessages = await Message.find({
		receiverId: userId,
		status: "sent",
	});

if (pendingMessages.length > 0) {
await Message.updateMany(
	{
		receiverId: userId,
		status: "sent",
	},
	{
		$set: {
			status: "delivered",
		},
	}
);

		// Notify connected clients about each delivered message
		for (const message of pendingMessages) {
			io.emit("messageDelivered", {
				messageId: message._id,
			});
		}
	}
} catch (error) {
	console.log(
		"Error updating pending messages: ",
		error.message
	);
}
}

socket.on("typing", ({ receiverId }) => {
const receiverSocketId = getReceiverSocketId(receiverId);

if (receiverSocketId) {
io.to(receiverSocketId).emit("userTyping", {
senderId: userId,
});
}
});

socket.on("stopTyping", ({ receiverId }) => {
const receiverSocketId = getReceiverSocketId(receiverId);

if (receiverSocketId) {
io.to(receiverSocketId).emit("userStoppedTyping", {
senderId: userId,
});
}
});

socket.on("disconnect", async () => {
console.log("User disconnected:", socket.id);

if (userId && userId !== "undefined") {
	const sockets = userSocketMap.get(userId);

if (sockets) {
	sockets.delete(socket.id);

	//when User is completely offline then only emit it's last seen
	if (sockets.size === 0) {
		userSocketMap.delete(userId);

		const lastSeen = new Date();
   try {
		await User.findByIdAndUpdate(userId, {
			lastSeen,
		});

		io.emit("userLastSeen", {
			userId,
			lastSeen,
		});
	} catch (error) {
		console.log(
			"Error updating last seen:",
			error.message
		);
	 }
	}
 }
}

// Update online users
		io.emit("getOnlineUsers", [...userSocketMap.keys()]);
	});
});

export { app, io, server };