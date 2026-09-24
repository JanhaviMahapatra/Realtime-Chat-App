import { create } from "zustand";

const useConversation = create((set) => ({
selectedConversation: null,

setSelectedConversation: (selectedConversation) =>
set({ selectedConversation }),


messages: [],

setMessages: (messages) =>
set((state) => ({
messages:
	typeof messages === "function"
		? messages(state.messages)
		: messages,
})),

//Updates message status
updateMessageStatus: (messageId, status) =>
set((state) => ({
messages: state.messages.map((message) =>
	message._id === messageId
		? { ...message, status }
		: message
),
})),

//Updates an existing message
updateMessage: (updatedMessage) =>
set((state) => ({
messages: state.messages.map((message) =>
	message._id === updatedMessage._id
		? updatedMessage
		: message
),
})),

//Removes a message
removeMessage: (messageId) =>
set((state) => ({
messages: state.messages.filter(
	(message) => message._id !== messageId
),
})),

//Reply state
replyingTo: null,

setReplyingTo: (message) =>
set({ replyingTo: message }),

//Edit state
editingMessage: null,

setEditingMessage: (message) =>
set({ editingMessage: message }),
}));

export default useConversation;