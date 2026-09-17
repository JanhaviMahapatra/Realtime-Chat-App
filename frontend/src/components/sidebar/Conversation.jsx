import "../../style/Conversation.css";

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	if (!conversation) return null;

	const isSelected = selectedConversation?._id === conversation._id;
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`conversation-card ${isSelected ? "active" : ""}`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className="conversation-avatar">
							<img
				src={conversation.profilePic}
				alt={conversation.fullName}
				loading="lazy"
				onError={(e) => {
					e.currentTarget.src =
						"https://ui-avatars.com/api/?name=User&background=4F8CFF&color=fff";
				}}
			/>

					{isOnline && (
						<span className="status-indicator"></span>
					)}
				</div>

				<div className="conversation-content">
					<div className="conversation-header">
						<h4>{conversation.fullName}</h4>

						<span className="conversation-emoji">
							{emoji}
						</span>
					</div>

					<div className="conversation-status">
						<span
							className={`status-text ${
								isOnline ? "online" : "offline"
							}`}
						>
							{isOnline ? "Online" : "Offline"}
						</span>
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