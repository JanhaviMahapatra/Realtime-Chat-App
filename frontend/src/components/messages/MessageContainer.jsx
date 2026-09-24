import "../../style/MessageContainer.css";

import { useEffect, useState } from "react";

import {
TiMessages,
} from "react-icons/ti";

import {
FiSearch,
FiX,
FiArrowLeft,
FiPhone,
FiVideo,
FiMoreVertical,
FiLock,
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

const [searchOpen, setSearchOpen] = useState(false);

const [searchQuery, setSearchQuery] = useState("");

const [
selectedSearchMessage,
setSelectedSearchMessage,
] = useState(null);

const {
onlineUsers,
lastSeenUsers,
typingUsers,
} = useSocketContext();

useEffect(() => {
return () => setSelectedConversation(null);
}, [setSelectedConversation]);

/* -----------------------------
USER STATUS
----------------------------- */

const isOnline = selectedConversation
? onlineUsers.includes(selectedConversation._id)
: false;

const isTyping = selectedConversation
? typingUsers.includes(selectedConversation._id)
: false;

const lastSeen =
selectedConversation &&
(
lastSeenUsers[selectedConversation._id] ||
selectedConversation.lastSeen
);


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

/* -----------------------------
SEARCH
----------------------------- */

const handleSearchToggle = () => {
setSearchOpen((prev) => !prev);
setSearchQuery("");
setSelectedSearchMessage(null);
};

/* -----------------------------
BACK
----------------------------- */

const handleBack = () => {
setSearchOpen(false);
setSearchQuery("");
setSelectedSearchMessage(null);
setSelectedConversation(null);
};

return (
<div className="message-container">

{!selectedConversation ? (
<NoChatSelected />
) : (
<>
{/* =================================
CHAT HEADER
================================= */}

<header className="chat-header">

{searchOpen ? (

/* -----------------------------
MESSAGE SEARCH HEADER
----------------------------- */

<div className="chat-search">

<button
type="button"
className="chat-search-close"
onClick={handleSearchToggle}
title="Close search"
>
<FiX />
</button>

<div className="chat-search-input-wrapper">
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

</div>

) : (

/* -----------------------------
NORMAL CHAT HEADER
----------------------------- */

<>

{/* Mobile Back Button */}

<button
type="button"
className="mobile-back-btn"
onClick={handleBack}
title="Back to conversations"
>
<FiArrowLeft />
</button>


{/* User Information */}

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

<div className="chat-user-name-row">

<h3>
{selectedConversation.fullName}
</h3>


</div>


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


{/* Header Actions */}

<div className="chat-actions">

{/* Search */}

<button
type="button"
onClick={handleSearchToggle}
title="Search messages"
>
<FiSearch />
</button>


{/* Voice Call - UI ONLY */}

<button
type="button"
title="Voice call"
className="header-action-desktop"
>
<FiPhone />
</button>


{/* Video Call - UI ONLY */}

<button
type="button"
title="Video call"
className="header-action-desktop"
>
<FiVideo />
</button>


{/* More Options - UI ONLY */}

<button
type="button"
title="More options"
className="header-more-btn"
>
<FiMoreVertical />
</button>

</div>

</>

)}

</header>


{/* =================================
CONVERSATION CONTEXT
================================= */}

<div className="conversation-context">

<div className="context-icon">
<FiLock />
</div>

<div className="context-content">

<span className="context-title">
End-to-end encrypted
</span>

<span className="context-text">
Messages are secured between you and{" "}
{selectedConversation.fullName}.
</span>

</div>

</div>


{/* =================================
MESSAGES
================================= */}

<Messages
searchQuery={searchQuery}
selectedSearchMessage={selectedSearchMessage}
setSelectedSearchMessage={
setSelectedSearchMessage
}
/>


{/* =================================
MESSAGE INPUT
================================= */}

<MessageInput />

</>
)}

</div>
);
};


/* =========================================
NO CHAT SELECTED
========================================= */

const NoChatSelected = () => {

const { authUser } = useAuthContext();

return (
<div className="empty-chat">

<div className="empty-card">

{/* Icon */}

<div className="empty-icon">
<TiMessages />
</div>


{/* Heading */}

<h2>
Welcome back, {authUser.fullName}
</h2>


{/* Description */}

<p>
Choose a conversation from the sidebar
and start messaging instantly.
</p>


<div className="empty-security">

<FiLock />

<span>
Your conversations are private and secure.
</span>

</div>

</div>

</div>
);
};

export default MessageContainer;