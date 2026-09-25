import "../../style/Conversations.css";

import {
useEffect,
useLayoutEffect,
useRef,
} from "react";

import {
FiMessageCircle,
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

const setUnreadCount =
useConversation(
(state) => state.setUnreadCount
);

const conversationRefs =
useRef(new Map());

const previousPositions =
useRef(new Map());

useEffect(() => {
conversations.forEach(
(conversation) => {
setUnreadCount(
conversation._id,
conversation.unreadCount || 0
);
}
);
}, [
conversations,
setUnreadCount,
]);

useLayoutEffect(() => {
const currentPositions =
new Map();

conversationRefs.current.forEach(
(element, id) => {
if (!element) return;

currentPositions.set(
id,
element.getBoundingClientRect()
.top
);
}
);

currentPositions.forEach(
(currentTop, id) => {
const previousTop =
previousPositions.current.get(
id
);

if (
previousTop === undefined
) {
return;
}

const difference =
previousTop - currentTop;

if (difference === 0) {
return;
}

const element =
conversationRefs.current.get(
id
);

if (!element) return;

element.animate(
[
{
transform: `translateY(${difference}px)`,
},
{
transform:
"translateY(0)",
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
(_, i) =>
i !== index
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
  conversations.length - 1
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