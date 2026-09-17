import "../../style/Conversations.css";

import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

import Conversation from "./Conversation";

const Conversations = () => {
	const { loading, conversations } = useGetConversations();

	return (
		<div className="conversations-list">
			{loading ? (
				<div className="conversation-loader">
					<div className="spinner"></div>
				</div>
			) : conversations.length > 0 ? (
				conversations.map((conversation, index) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={index === conversations.length - 1}
					/>
				))
			) : (
				<div className="empty-conversations">
					<div className="empty-conversations-icon">
						💬
					</div>

					<h3>No Conversations</h3>

					<p>
						Your conversations will appear here once you start chatting.
					</p>
				</div>
			)}
		</div>
	);
};

export default Conversations;