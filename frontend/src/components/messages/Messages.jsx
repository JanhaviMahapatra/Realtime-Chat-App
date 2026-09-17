import "../../style/Messages.css";

import { useEffect, useRef } from "react";

import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = () => {
	const { messages, loading } = useGetMessages();

	useListenMessages();

	const lastMessageRef = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({
				behavior: "smooth",
			});
		}, 100);
	}, [messages]);

return (
	<div className="messages-container">
		<div className="messages-wrapper">

			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div
						key={message._id}
						ref={lastMessageRef}
						className="message-item"
					>
						<Message message={message} />
					</div>
				))}

			{loading &&
				[...Array(5)].map((_, index) => (
					<MessageSkeleton key={index} />
				))}

			{!loading && messages.length === 0 && (
				<div className="empty-state">

					<div className="empty-state-icon">
						💬
					</div>

					<h2>No messages yet</h2>

					<p>
						Send your first message to start the conversation.
					</p>

				</div>
			)}

		</div>
	</div>
);
};

export default Messages;