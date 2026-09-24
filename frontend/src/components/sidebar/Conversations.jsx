import "../../style/Conversations.css";

import { FiMessageCircle } from "react-icons/fi";

import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
const {
loading,
conversations = [],
} = useGetConversations();

return (
<div className="conversations-list">
{loading ? (
<div className="conversation-loader">
<div className="spinner"></div>

<span>
Loading conversations...
</span>
</div>
) : conversations.length > 0 ? (
conversations.map(
(conversation, index) => (
<Conversation
key={conversation._id}
conversation={conversation}
lastIdx={
index ===
conversations.length - 1
}
/>
)
)
) : (
<div className="empty-conversations">
<div className="empty-conversations-icon">
<FiMessageCircle />
</div>

<h3>
No conversations yet
</h3>

<p>
Start a new conversation and
your chats will appear here.
</p>
</div>
)}
</div>
);
};

export default Conversations;