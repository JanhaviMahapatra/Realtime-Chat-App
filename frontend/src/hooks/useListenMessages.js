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
		if (!socket) {
			console.log(
				"useListenMessages: No socket"
			);
			return;
		}

		console.log(
			"useListenMessages: Socket available",
			socket.id,
			"connected:",
			socket.connected
		);

		const handleNewMessage = async (
			newMessage
		) => {
			console.log(
				"NEW MESSAGE SOCKET EVENT RECEIVED:",
				newMessage
			);

			newMessage.shouldShake = true;

			const sound = new Audio(
				notificationSound
			);

			sound.play().catch(() => {});

			console.log(
				"Selected conversation:",
				selectedConversation?._id
			);

			console.log(
				"New message sender:",
				newMessage.senderId
			);

			const isCurrentConversation =
				String(
					selectedConversation?._id
				) ===
				String(
					newMessage.senderId
				);

			console.log(
				"Is current conversation:",
				isCurrentConversation
			);

			if (isCurrentConversation) {
				console.log(
					"Adding message to current chat"
				);

				setMessages(
					(currentMessages) => [
						...currentMessages,
						newMessage,
					]
				);

				await markMessagesAsRead(
					newMessage.senderId
				);
			} else {
				console.log(
					"Incrementing unread count for:",
					newMessage.senderId
				);

				incrementUnreadCount(
					newMessage.senderId
				);
			}

			console.log(
				"Dispatching conversationActivity for:",
				newMessage.senderId
			);

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