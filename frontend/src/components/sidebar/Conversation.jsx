import "../../style/Conversation.css";

import {
FiClock,
FiLock,
FiVolumeX,
} from "react-icons/fi";

import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({
conversation,
lastIdx,
}) => {
const {
selectedConversation,
setSelectedConversation,
clearUnreadCount,
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
if (!date) {
return "Last seen recently";
}

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

const lastMessagePreview =
conversation.lastMessagePreview || "";

const lastMessageTime =
conversation.lastMessageTime || "";

const unreadCount =
useConversation.getState().unreadCounts[
conversation._id
] || 0;

const isMuted =
conversation.isMuted || false;

const isLocked =
conversation.isLocked || false;

const handleConversationClick = () => {
clearUnreadCount(conversation._id);
setSelectedConversation(conversation);
};

return (
<>
<div
className={`conversation-card ${
isSelected ? "active" : ""
}`}
onClick={handleConversationClick}
>
<div className="conversation-content">
<div className="conversation-avatar-wrapper">
<img
src={conversation.profilePic}
alt={conversation.fullName}
className="conversation-avatar"
/>

{isOnline && (
<span className="status-indicator"></span>
)}
</div>

<div className="conversation-details">
<div className="conversation-top-row">
<h4>
{conversation.fullName}
</h4>

{lastMessageTime && (
<span className="conversation-time">
{lastMessageTime}
</span>
)}
</div>

<div className="conversation-bottom-row">
<div className="conversation-preview">
{isLocked && (
<FiLock className="conversation-meta-icon" />
)}

{isOnline ? (
<span className="conversation-status-online">
Online
</span>
) : (
<>
<FiClock className="conversation-meta-icon" />

<span className="conversation-status-offline">
{formatLastSeen(
lastSeen
)}
</span>
</>
)}

<span className="conversation-preview-separator">
·
</span>

<span className="last-message-preview">
{lastMessagePreview}
</span>
</div>

<div className="conversation-meta">
{isMuted && (
<FiVolumeX className="muted-icon" />
)}

{unreadCount > 0 && (
<span className="unread-badge">
{unreadCount > 99
? "99+"
: unreadCount}
</span>
)}
</div>
</div>
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