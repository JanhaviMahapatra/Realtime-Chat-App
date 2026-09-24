import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";

import useConversation from "../zustand/useConversation";
import useMarkMessagesAsRead from "./useMarkMessagesAsRead";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
const { socket } = useSocketContext();

const {
setMessages,
selectedConversation,
incrementUnreadCount,
} = useConversation();

const { markMessagesAsRead } =
useMarkMessagesAsRead();

useEffect(() => {
if (!socket) return;

const handleNewMessage = async (
newMessage
) => {
newMessage.shouldShake = true;

const sound = new Audio(
notificationSound
);

sound.play().catch(() => {});

const isCurrentConversation =
selectedConversation?._id ===
newMessage.senderId;

if (isCurrentConversation) {
setMessages((currentMessages) => [
	...currentMessages,
	newMessage,
]);

await markMessagesAsRead(
	newMessage.senderId
);
} else {
incrementUnreadCount(
	newMessage.senderId
);
}

window.dispatchEvent(
new CustomEvent(
	"conversationActivity",
	{
		detail: {
			userId:
				newMessage.senderId,
		},
	}
)
);
};

socket.on(
"newMessage",
handleNewMessage
);

return () => {
socket.off(
"newMessage",
handleNewMessage
);
};
}, [
socket,
setMessages,
selectedConversation,
incrementUnreadCount,
markMessagesAsRead,
]);
};

export default useListenMessages;