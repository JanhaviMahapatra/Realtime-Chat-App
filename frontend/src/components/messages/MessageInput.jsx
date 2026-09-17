import "../../style/MessageInput.css";

import { useState } from "react";
import { BsSend } from "react-icons/bs";

import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!message.trim()) return;

		await sendMessage(message);
		setMessage("");
	};

return (
	<form className="message-form" onSubmit={handleSubmit}>
		<div className="composer">

			<button
				type="button"
				className="composer-icon"
				title="Attach file"
			>
				📎
			</button>

			<input
				type="text"
				className="composer-input"
				placeholder="Type your message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>

			<button
				type="button"
				className="composer-icon"
				title="Emoji"
			>
				😊
			</button>

			<button
				type="submit"
				className="send-btn"
				disabled={loading}
			>
				{loading ? (
					<div className="spinner"></div>
				) : (
					<BsSend />
				)}
			</button>

		</div>
	</form>
);	
};

export default MessageInput;