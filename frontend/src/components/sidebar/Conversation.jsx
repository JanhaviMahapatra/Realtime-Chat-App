import "../../style/Conversation.css";

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
	const {
		selectedConversation,
		setSelectedConversation,
	} = useConversation();

	const {
		onlineUsers,
		lastSeenUsers,
	} = useSocketContext();

	if (!conversation) return null;

	const isSelected =
		selectedConversation?._id === conversation._id;

	const isOnline =
		onlineUsers.includes(conversation._id);

	const lastSeen =
		lastSeenUsers[conversation._id] ||
		conversation.lastSeen;

	const formatLastSeen = (date) => {
		if (!date) return "Last seen recently";

		const lastSeenDate = new Date(date);
		const now = new Date();

		const diffInSeconds = Math.floor(
			(now - lastSeenDate) / 1000
		);

		if (diffInSeconds < 60) {
			return "Last seen just now";
		}

		const diffInMinutes = Math.floor(
			diffInSeconds / 60
		);

		if (diffInMinutes < 60) {
			return `Last seen ${diffInMinutes}m ago`;
		}

		const diffInHours = Math.floor(
			diffInMinutes / 60
		);

		if (diffInHours < 24) {
			return `Last seen ${diffInHours}h ago`;
		}

		const diffInDays = Math.floor(
			diffInHours / 24
		);

		if (diffInDays < 7) {
			return `Last seen ${diffInDays}d ago`;
		}

		return `Last seen ${lastSeenDate.toLocaleDateString()}`;
	};

	return (
		<>
			<div
				className={`conversation-card ${
					isSelected ? "active" : ""
				}`}
				onClick={() =>
					setSelectedConversation(conversation)
				}
			>
				<div className="conversation-content">
					<div className="conversation-header">
						<h4>{conversation.fullName}</h4>
					</div>

					<div className="conversation-status">
						{isOnline ? (
							<>
								<span className="status-indicator"></span>

								<span className="status-text online">
									Online
								</span>
							</>
						) : (
							<span className="status-text offline">
								{formatLastSeen(lastSeen)}
							</span>
						)}
					</div>
				</div>
			</div>

			{!lastIdx && (
				<div className="conversation-divider"></div>
			)}
		</>
	);
};

export default Conversation;