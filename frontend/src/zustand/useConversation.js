import { create } from "zustand";

const useConversation = create((set) => ({
selectedConversation: null,

setSelectedConversation: (selectedConversation) =>
set({
selectedConversation,
}),

messages: [],

setMessages: (messages) =>
set((state) => ({
messages:
	typeof messages === "function"
		? messages(state.messages)
		: messages,
})),

unreadCounts: {},

setUnreadCount: (userId, count) =>
set((state) => ({
unreadCounts: {
	...state.unreadCounts,
	[userId]: count,
},
})),

incrementUnreadCount: (userId) =>
set((state) => ({
unreadCounts: {
	...state.unreadCounts,
	[userId]:
		(state.unreadCounts[userId] || 0) + 1,
},
})),

clearUnreadCount: (userId) =>
set((state) => {
const updatedCounts = {
	...state.unreadCounts,
};

delete updatedCounts[userId];

return {
	unreadCounts: updatedCounts,
};
}),

updateMessageStatus: (messageId, status) =>
set((state) => ({
messages: state.messages.map((message) =>
	message._id === messageId
		? { ...message, status }
		: message
),
})),

updateMessage: (updatedMessage) =>
set((state) => ({
messages: state.messages.map((message) =>
	message._id === updatedMessage._id
		? updatedMessage
		: message
),
})),

removeMessage: (messageId) =>
set((state) => ({
messages: state.messages.filter(
	(message) => message._id !== messageId
),
})),

replyingTo: null,

setReplyingTo: (message) =>
set({
replyingTo: message,
}),

editingMessage: null,

setEditingMessage: (message) =>
set({
editingMessage: message,
}),
}));

export default useConversation;