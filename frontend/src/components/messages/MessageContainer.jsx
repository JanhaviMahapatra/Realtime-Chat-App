import "../../style/MessageContainer.css";

import { useEffect, useState } from "react";
import { TiMessages } from "react-icons/ti";
import {
FiSearch,
FiMoreVertical,
FiX,
} from "react-icons/fi";

import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
const {
selectedConversation,
setSelectedConversation,
} = useConversation();

const [searchOpen, setSearchOpen] =
useState(false);

const [searchQuery, setSearchQuery] =
useState("");

const [selectedSearchMessage, setSelectedSearchMessage] =
useState(null);

const {
onlineUsers,
lastSeenUsers,
typingUsers,
} = useSocketContext();

useEffect(() => {
return () => setSelectedConversation(null);
}, [setSelectedConversation]);

const isOnline = selectedConversation
? onlineUsers.includes(selectedConversation._id)
: false;

const isTyping = selectedConversation
? typingUsers.includes(selectedConversation._id)
: false;

const lastSeen =
selectedConversation &&
(lastSeenUsers[selectedConversation._id] ||
selectedConversation.lastSeen);

const formatLastSeen = (lastSeen) => {
if (!lastSeen) {
return "Never seen";
}

const date = new Date(lastSeen);

const time = date.toLocaleTimeString([], {
hour: "2-digit",
minute: "2-digit",
});

const today = new Date();

const isToday =
date.getDate() === today.getDate() &&
date.getMonth() === today.getMonth() &&
date.getFullYear() === today.getFullYear();

if (isToday) {
return `Last seen today at ${time}`;
}

const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const isYesterday =
date.getDate() === yesterday.getDate() &&
date.getMonth() === yesterday.getMonth() &&
date.getFullYear() === yesterday.getFullYear();

if (isYesterday) {
return `Last seen yesterday at ${time}`;
}

return `Last seen on ${date.toLocaleDateString()} at ${time}`;
};

const handleSearchToggle = () => {
setSearchOpen((prev) => !prev);
setSearchQuery("");
setSelectedSearchMessage(null);
};

return (
<div className="message-container">
{!selectedConversation ? (
<NoChatSelected />
) : (
<>
<header className="chat-header">
{searchOpen ? (
<div className="chat-search">

<button
type="button"
className="chat-search-close"
onClick={handleSearchToggle}
>
<FiX />
</button>

<FiSearch />

<input
type="text"
placeholder="Search messages..."
value={searchQuery}
onChange={(e) =>
setSearchQuery(e.target.value)
}
autoFocus
/>

</div>
) : (
<>
<div className="chat-user">
<div className="chat-avatar">
<img
src={selectedConversation.profilePic}
alt={selectedConversation.fullName}
/>

{isOnline && (
<span className="online-dot"></span>
)}
</div>

<div className="chat-user-info">
<h3>
{selectedConversation.fullName}
</h3>

<p
className={
isTyping
? "typing"
: isOnline
? "online"
: "offline"
}
>
{isTyping
? "Typing..."
: isOnline
? "Online"
: formatLastSeen(lastSeen)}
</p>
</div>
</div>

<div className="chat-actions">

<button
type="button"
onClick={handleSearchToggle}
title="Search messages"
>
<FiSearch />
</button>

</div>
</>
)}
</header>

<Messages
searchQuery={searchQuery}
selectedSearchMessage={selectedSearchMessage}
setSelectedSearchMessage={
setSelectedSearchMessage
}
/>

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

<h2>
Welcome back, {authUser.fullName}
</h2>

<p>
Choose a conversation from the sidebar and
start messaging instantly.
</p>
</div>
</div>
);
};

export default MessageContainer;