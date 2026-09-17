import "../../style/Message.css";

import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);

	const chatClass = fromMe ? "chat-end" : "chat-start";
	const bubbleClass = fromMe ? "message-bubble own-message" : "message-bubble";

	const profilePic = fromMe
		? authUser.profilePic
		: selectedConversation?.profilePic;

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
	<div className={`message-row ${fromMe ? "outgoing" : "incoming"} ${shakeClass}`}>
		{!fromMe && (
			<div className="message-avatar">
				<img src={profilePic} alt={selectedConversation?.fullName} />
			</div>
		)}

		<div className="message-content">
			<div className={`message-bubble ${fromMe ? "sent" : "received"}`}>
				<p>{message.message}</p>

				<div className="message-meta">
					<span>{formattedTime}</span>

					{fromMe && (
						<span className="message-status">
							✓✓
						</span>
					)}
				</div>
			</div>
		</div>

		{fromMe && (
			<div className="message-avatar">
				<img src={profilePic} alt="You" />
			</div>
		)}
	</div>
);
};

export default Message;