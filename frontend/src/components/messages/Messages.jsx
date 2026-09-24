import "../../style/Messages.css";

import {
useEffect,
useRef,
} from "react";

import {
FiSearch,
FiMessageCircle,
} from "react-icons/fi";

import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";

const Messages = ({
searchQuery,
selectedSearchMessage,
setSelectedSearchMessage,
}) => {
const { messages, loading } =
useGetMessages();

useListenMessages();

const messageRefs = useRef({});

const lastMessageRef = useRef(null);

const filteredMessages =
searchQuery.trim()
? messages.filter((message) =>
message.message
?.toLowerCase()
.includes(
searchQuery
.trim()
.toLowerCase()
)
)
: [];

useEffect(() => {
if (
selectedSearchMessage &&
messageRefs.current[
selectedSearchMessage
]
) {
messageRefs.current[
selectedSearchMessage
].scrollIntoView({
behavior: "smooth",
block: "center",
});

setTimeout(() => {
setSelectedSearchMessage(null);
}, 1500);
}
}, [
selectedSearchMessage,
setSelectedSearchMessage,
]);

useEffect(() => {
if (!searchQuery.trim()) {
setTimeout(() => {
lastMessageRef.current?.scrollIntoView({
behavior: "smooth",
});
}, 100);
}
}, [messages, searchQuery]);

return (
<div className="messages-container">

{searchQuery.trim() && (
<div className="message-search-results">

<div className="message-search-header">

<div className="message-search-title">
<FiSearch />

<span>
{filteredMessages.length}{" "}
{filteredMessages.length === 1
? "message"
: "messages"}{" "}
found
</span>
</div>

</div>


{filteredMessages.length > 0 ? (

<div className="message-search-list">

{filteredMessages.map(
(message) => (
<button
key={message._id}
type="button"
className="message-search-result"
onClick={() =>
setSelectedSearchMessage(
message._id
)
}
>

<div className="search-result-content">

<div className="search-result-message">
{message.message ||
"Attachment"}
</div>

<div className="search-result-time">
{new Date(
message.createdAt
).toLocaleTimeString(
[],
{
	hour: "2-digit",
	minute: "2-digit",
}
)}
</div>

</div>

</button>
)
)}

</div>

) : (

<div className="message-search-empty">

<div className="message-search-empty-icon">
<FiSearch />
</div>

<p>
No messages found
</p>

<span>
Try searching for another word
</span>

</div>

)}

</div>
)}


<div className="messages-wrapper">

{!loading &&
messages.length > 0 &&
messages.map((message) => (

<div
key={message._id}
ref={(element) => {
messageRefs.current[
message._id
] = element;

lastMessageRef.current =
element;
}}
className={`message-item ${
selectedSearchMessage ===
message._id
? "search-highlight"
: ""
}`}
>

<Message
message={message}
/>

</div>

))}


{loading &&
[...Array(5)].map(
(_, index) => (
<MessageSkeleton
key={index}
/>
)
)}


{!loading &&
messages.length === 0 && (

<div className="empty-state">

<div className="empty-state-icon">
<FiMessageCircle />
</div>

<h2>
No messages yet
</h2>

<p>
Send your first message to
start the conversation.
</p>

</div>

)}

</div>

</div>
);
};

export default Messages;