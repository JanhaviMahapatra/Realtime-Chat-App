import "../../style/Conversation.css";

import {
FiArchive,
FiBookmark,
FiCheck,
FiChevronDown,
FiChevronRight,
FiClock,
FiHeart,
FiLock,
FiPaperclip,
FiTrash2,
FiUserX,
FiVolume2,
FiVolumeX,
FiXCircle,
} from "react-icons/fi";

import {
useEffect,
useLayoutEffect,
useRef,
useState,
} from "react";

import { createPortal } from "react-dom";

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
setUnreadCount,
} = useConversation();

const unreadCount =
useConversation.getState().unreadCounts[
conversation?._id
] || 0;

const {
onlineUsers,
lastSeenUsers,
} = useSocketContext();

const [isMenuOpen, setIsMenuOpen] = useState(false);
const [showMuteMenu, setShowMuteMenu] = useState(false);
const [showListMenu, setShowListMenu] = useState(false);

const [menuPosition, setMenuPosition] = useState({
left: 0,
top: 0,
});

const [openUpward, setOpenUpward] = useState(false);

const menuButtonRef = useRef(null);
const menuRef = useRef(null);

const [isMuted, setIsMuted] = useState(
conversation?.isMuted || false
);

const [isLocked, setIsLocked] = useState(
conversation?.isLocked || false
);

const [isPinned, setIsPinned] = useState(
conversation?.isPinned || false
);

const [isFavorite, setIsFavorite] = useState(
conversation?.isFavorite || false
);

const [isArchived, setIsArchived] = useState(
conversation?.isArchived || false
);

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

const handleConversationClick = () => {
if (isMenuOpen) return;

clearUnreadCount(conversation._id);
setSelectedConversation(conversation);
};

const handleMenuToggle = (event) => {
event.stopPropagation();

if (isMenuOpen) {
setIsMenuOpen(false);
setShowMuteMenu(false);
setShowListMenu(false);
return;
}

setShowMuteMenu(false);
setShowListMenu(false);
setIsMenuOpen(true);

window.dispatchEvent(
new CustomEvent("conversation-menu-open", {
detail: conversation._id,
})
);
};

useLayoutEffect(() => {
if (!isMenuOpen) return;

const updateMenuPosition = () => {
if (
!menuButtonRef.current ||
!menuRef.current
) {
return;
}

const buttonRect =
menuButtonRef.current.getBoundingClientRect();

const menuRect =
menuRef.current.getBoundingClientRect();

const gap = 8;
const padding = 12;

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

const spaceBelow =
viewportHeight -
buttonRect.bottom -
padding;

const spaceAbove =
buttonRect.top -
padding;

const shouldOpenUp =
spaceBelow < menuRect.height &&
spaceAbove > spaceBelow;

let left = buttonRect.right + gap;

if (
left + menuRect.width >
viewportWidth - padding
) {
left =
buttonRect.right -
menuRect.width;
}

if (left < padding) {
left = padding;
}

let top;

if (shouldOpenUp) {
top =
buttonRect.top -
menuRect.height -
gap;
} else {
top =
buttonRect.bottom +
gap;
}

if (
top + menuRect.height >
viewportHeight - padding
) {
top =
viewportHeight -
menuRect.height -
padding;
}

if (top < padding) {
top = padding;
}

setMenuPosition({
left,
top,
});

setOpenUpward(shouldOpenUp);
};

requestAnimationFrame(updateMenuPosition);

window.addEventListener(
"resize",
updateMenuPosition
);

window.addEventListener(
"scroll",
updateMenuPosition,
true
);

return () => {
window.removeEventListener(
"resize",
updateMenuPosition
);

window.removeEventListener(
"scroll",
updateMenuPosition,
true
);
};
}, [isMenuOpen]);

useEffect(() => {
const handleOtherMenuOpen = (event) => {
if (
event.detail !== conversation._id
) {
setIsMenuOpen(false);
setShowMuteMenu(false);
setShowListMenu(false);
}
};

const handleOutsideClick = (event) => {
if (
menuRef.current?.contains(
event.target
)
) {
return;
}

if (
menuButtonRef.current?.contains(
event.target
)
) {
return;
}

setIsMenuOpen(false);
setShowMuteMenu(false);
setShowListMenu(false);
};

const handleEscape = (event) => {
if (event.key === "Escape") {
setIsMenuOpen(false);
setShowMuteMenu(false);
setShowListMenu(false);
}
};

window.addEventListener(
"conversation-menu-open",
handleOtherMenuOpen
);

document.addEventListener(
"mousedown",
handleOutsideClick
);

document.addEventListener(
"keydown",
handleEscape
);

return () => {
window.removeEventListener(
"conversation-menu-open",
handleOtherMenuOpen
);

document.removeEventListener(
"mousedown",
handleOutsideClick
);

document.removeEventListener(
"keydown",
handleEscape
);
};
}, [conversation._id]);

const handleArchive = (event) => {
event.stopPropagation();

setIsArchived((current) => !current);
setIsMenuOpen(false);
};

const handleLock = (event) => {
event.stopPropagation();

setIsLocked((current) => !current);
setIsMenuOpen(false);
};

const handleMute = (event) => {
event.stopPropagation();

setIsMuted((current) => !current);
setShowMuteMenu(false);
setIsMenuOpen(false);
};

const handlePin = (event) => {
event.stopPropagation();

setIsPinned((current) => !current);
setIsMenuOpen(false);
};

const handleMarkUnread = (event) => {
event.stopPropagation();

setUnreadCount(
conversation._id,
Math.max(unreadCount, 1)
);

setIsMenuOpen(false);
};

const handleFavorite = (event) => {
event.stopPropagation();

setIsFavorite((current) => !current);
setIsMenuOpen(false);
};

const handleBlock = (event) => {
event.stopPropagation();

setIsMenuOpen(false);
};

const handleClearChat = (event) => {
event.stopPropagation();

setIsMenuOpen(false);
};

const handleDeleteChat = (event) => {
event.stopPropagation();

setIsMenuOpen(false);
};

const handleListOption = (event) => {
event.stopPropagation();

setShowListMenu(false);
setIsMenuOpen(false);
};

const renderMenu = () => {
if (!isMenuOpen) return null;

return createPortal(
<div
ref={menuRef}
className={`conversation-menu ${
openUpward
? "menu-open-up"
: "menu-open-down"
}`}
style={{
left: `${menuPosition.left}px`,
top: `${menuPosition.top}px`,
}}
onClick={(event) =>
event.stopPropagation()
}
>
<button
type="button"
className="conversation-menu-item"
onClick={handleArchive}
>
<FiArchive />

<span>
{isArchived
? "Unarchive chat"
: "Archive chat"}
</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleLock}
>
<FiLock />

<span>
{isLocked
? "Unlock chat"
: "Lock chat"}
</span>
</button>

<div className="conversation-menu-submenu-wrapper">
<button
type="button"
className="conversation-menu-item"
onClick={(event) => {
event.stopPropagation();

setShowMuteMenu(
(current) => !current
);

setShowListMenu(false);
}}
>
{isMuted ? (
<FiVolume2 />
) : (
<FiVolumeX />
)}

<span>
{isMuted
? "Unmute notifications"
: "Mute notifications"}
</span>

<FiChevronRight className="menu-arrow" />
</button>

{showMuteMenu && (
<div className="conversation-submenu">
<button
type="button"
className="conversation-menu-item"
onClick={handleMute}
>
<span>8 hours</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleMute}
>
<span>1 week</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleMute}
>
<span>Always</span>
</button>
</div>
)}
</div>

<button
type="button"
className="conversation-menu-item"
onClick={handlePin}
>
<FiBookmark />

<span>
{isPinned
? "Unpin chat"
: "Pin chat"}
</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleMarkUnread}
>
<FiCheck />

<span>Mark as unread</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleFavorite}
>
<FiHeart />

<span>
{isFavorite
? "Remove from Favorites"
: "Add to Favorites"}
</span>
</button>

<div className="conversation-menu-submenu-wrapper">
<button
type="button"
className="conversation-menu-item"
onClick={(event) => {
event.stopPropagation();

setShowListMenu(
(current) => !current
);

setShowMuteMenu(false);
}}
>
<FiPaperclip />

<span>Add to list</span>

<FiChevronRight className="menu-arrow" />
</button>

{showListMenu && (
<div className="conversation-submenu">
<button
type="button"
className="conversation-menu-item"
onClick={handleListOption}
>
<span>Work</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleListOption}
>
<span>Family</span>
</button>

<button
type="button"
className="conversation-menu-item"
onClick={handleListOption}
>
<span>Friends</span>
</button>
</div>
)}
</div>

<div className="conversation-menu-divider"></div>

<button
type="button"
className="conversation-menu-item danger"
onClick={handleBlock}
>
<FiUserX />

<span>Block</span>
</button>

<button
type="button"
className="conversation-menu-item danger"
onClick={handleClearChat}
>
<FiXCircle />

<span>Clear chat</span>
</button>

<button
type="button"
className="conversation-menu-item danger"
onClick={handleDeleteChat}
>
<FiTrash2 />

<span>Delete chat</span>
</button>
</div>,
document.body
);
};

return (
<>
<div
className={`conversation-card ${
isSelected ? "active" : ""
} ${isArchived ? "archived" : ""}`}
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
<h4>{conversation.fullName}</h4>

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
    {formatLastSeen(lastSeen)}
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

{isPinned && (
<FiBookmark className="conversation-pin-icon" />
)}

{isFavorite && (
<FiHeart className="conversation-favorite-icon" />
)}

{unreadCount > 0 && (
<span className="unread-badge">
  {unreadCount > 99
    ? "99+"
    : unreadCount}
</span>
)}

<button
ref={menuButtonRef}
type="button"
className="conversation-menu-button"
onClick={handleMenuToggle}
aria-label="Chat options"
title="Chat options"
>
<FiChevronDown />
</button>
</div>
</div>
</div>
</div>
</div>

{!lastIdx && (
<div className="conversation-divider"></div>
)}

{renderMenu()}
</>
);
};

export default Conversation;