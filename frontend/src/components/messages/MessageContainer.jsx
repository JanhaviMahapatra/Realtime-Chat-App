import "../../style/MessageContainer.css";

import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import {
	FiPhone,
	FiVideo,
	FiSearch,
	FiMoreVertical,
} from "react-icons/fi";

import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className="message-container">
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<header className="chat-header">
						<div className="chat-user">
							<div className="chat-avatar">
								<img
									src={selectedConversation.profilePic}
									alt={selectedConversation.fullName}
								/>
								<span className="online-dot"></span>
							</div>

							<div className="chat-user-info">
								<h3>{selectedConversation.fullName}</h3>
								<p>Online</p>
							</div>
						</div>

						<div className="chat-actions">
							<button type="button">
								<FiPhone />
							</button>

							<button type="button">
								<FiVideo />
							</button>

							<div className="action-divider"></div>

							<button type="button">
								<FiSearch />
							</button>

							<button type="button">
								<FiMoreVertical />
							</button>
						</div>
					</header>

					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const { authUser } = useAuthContext();

	return (
		<div className="empty-chat">
			<div className="empty-card">
				<div className="empty-icon">
					<TiMessages />
				</div>

				<h2>Welcome back, {authUser.fullName}</h2>

				<p>
					Choose a conversation from the sidebar and start messaging
					instantly.
				</p>
			</div>
		</div>
	);
};

export default MessageContainer;