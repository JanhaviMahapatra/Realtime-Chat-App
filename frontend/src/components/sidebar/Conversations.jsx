import "../../style/Conversations.css";

import {
useEffect,
useLayoutEffect,
useRef,
useState,
} from "react";

import {
FiMessageCircle,
FiPlus,
} from "react-icons/fi";

import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
const {
loading,
conversations = [],
setConversations,
} = useGetConversations();

const setUnreadCount = useConversation(
(state) => state.setUnreadCount
);

const [activeFilter, setActiveFilter] =
useState("all");

const conversationRefs =
useRef(new Map());

const previousPositions =
useRef(new Map());

const initializedUnreadCounts =
useRef(new Set());

useEffect(() => {
conversations.forEach(
(conversation) => {
if (
initializedUnreadCounts.current.has(
conversation._id
)
) {
return;
}

setUnreadCount(
conversation._id,
conversation.unreadCount || 0
);

initializedUnreadCounts.current.add(
conversation._id
);
}
);
}, [
conversations,
setUnreadCount,
]);

useLayoutEffect(() => {
const currentPositions = new Map();

conversationRefs.current.forEach(
(element, id) => {
if (!element) return;

currentPositions.set(
id,
element.getBoundingClientRect().top
);
}
);

currentPositions.forEach(
(currentTop, id) => {
const previousTop =
previousPositions.current.get(id);

if (previousTop === undefined) {
return;
}

const difference =
previousTop - currentTop;

if (difference === 0) {
return;
}

const element =
conversationRefs.current.get(id);

if (!element) return;

element.animate(
[
{
transform: `translateY(${difference}px)`,
},
{
transform: "translateY(0)",
},
],
{
duration: 350,
easing:
"cubic-bezier(0.22, 1, 0.36, 1)",
}
);
}
);

previousPositions.current =
currentPositions;
}, [conversations]);

useEffect(() => {
const handleConversationActivity = (
event
) => {
const userId =
event.detail?.userId;

if (!userId) return;

const activityUserId =
String(userId);

setConversations(
(currentConversations) => {
if (
!Array.isArray(
currentConversations
)
) {
return currentConversations;
}

const index =
currentConversations.findIndex(
(conversation) =>
String(
conversation._id
) ===
activityUserId
);

if (index <= 0) {
return currentConversations;
}

const updatedConversation =
currentConversations[index];

return [
updatedConversation,
...currentConversations.filter(
(_, i) => i !== index
),
];
}
);
};

window.addEventListener(
"conversationActivity",
handleConversationActivity
);

return () => {
window.removeEventListener(
"conversationActivity",
handleConversationActivity
);
};
}, [setConversations]);

const unreadCount = conversations.reduce(
(total, conversation) =>
total +
(conversation.unreadCount || 0),
0
);

const filteredConversations =
activeFilter === "unread"
? conversations.filter(
(conversation) =>
(conversation.unreadCount || 0) >
0
)
: conversations;

const filters = [
{
id: "all",
label: "All",
},
{
id: "unread",
label: "Unread",
count: unreadCount,
},
{
id: "favorites",
label: "Favorites",
},
{
id: "groups",
label: "Groups",
},
];

return (
<div className="conversations-wrapper">
<div className="conversation-filters">
{filters.map((filter) => (
<button
key={filter.id}
type="button"
className={`conversation-filter ${
activeFilter === filter.id
? "active"
: ""
}`}
onClick={() =>
setActiveFilter(filter.id)
}
>
<span>{filter.label}</span>

{filter.count > 0 && (
<span className="filter-count">
{filter.count}
</span>
)}
</button>
))}

<button
type="button"
className="conversation-filter-add"
aria-label="Add filter"
title="Add filter"
>
<FiPlus />
</button>
</div>

<div className="conversations-list">
{loading ? (
<div className="conversation-loader">
<div className="spinner"></div>

<span>
Loading conversations...
</span>
</div>
) : filteredConversations.length > 0 ? (
filteredConversations.map(
(conversation, index) => (
<div
key={conversation._id}
ref={(element) => {
if (element) {
conversationRefs.current.set(
conversation._id,
element
);
} else {
conversationRefs.current.delete(
conversation._id
);
}
}}
>
<Conversation
conversation={
conversation
}
lastIdx={
index ===
filteredConversations.length -
1
}
/>
</div>
)
)
) : (
<div className="empty-conversations">
<div className="empty-conversations-icon">
<FiMessageCircle />
</div>

<h3>
{activeFilter === "unread"
? "No unread conversations"
: "No conversations yet"}
</h3>

<p>
{activeFilter === "unread"
? "You're all caught up."
: "Start a new conversation and your chats will appear here."}
</p>
</div>
)}
</div>
</div>
);
};

export default Conversations;