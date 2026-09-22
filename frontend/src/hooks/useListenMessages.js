import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
const { socket } = useSocketContext();
const { setMessages } = useConversation();

useEffect(() => {
if (!socket) return;

const handleNewMessage = (newMessage) => {
	newMessage.shouldShake = true;

	const sound = new Audio(
		notificationSound
	);

	sound.play().catch(() => {});

	setMessages((currentMessages) => [
		...currentMessages,
		newMessage,
	]);
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
}, [socket, setMessages]);
};

export default useListenMessages;