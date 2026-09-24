import "../../style/Message.css";

import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

import {
FiCornerUpLeft,
FiEdit2,
FiTrash2,
FiFile,
FiDownload,
FiCheck,
} from "react-icons/fi";

const Message = ({ message }) => {
const { authUser } = useAuthContext();

const {
selectedConversation,
setReplyingTo,
setEditingMessage,
removeMessage,
} = useConversation();

const fromMe =
message.senderId === authUser._id;

const formattedTime = extractTime(
message.createdAt
);

const profilePic = fromMe
? authUser.profilePic
: selectedConversation?.profilePic;

const shakeClass = message.shouldShake
? "shake"
: "";

const getMessageStatus = () => {
if (!fromMe) return null;

if (
message.status === "read" ||
message.status === "delivered"
) {
return "✓✓";
}

return "✓";
};

const handleReply = () => {
setReplyingTo(message);
};

const handleEdit = () => {
if (message.messageType !== "text") {
return;
}

setEditingMessage(message);
};

const handleDelete = () => {
toast(
(t) => (
<div className="delete-confirm-toast">
<p>
Are you sure you want to delete this message?
</p>

<div className="delete-confirm-actions">
<button
type="button"
onClick={() => {
toast.dismiss(t.id);
confirmDelete();
}}
>
Delete
</button>

<button
type="button"
onClick={() =>
toast.dismiss(t.id)
}
>
Cancel
</button>
</div>
</div>
),
{
duration: 5000,
}
);
};

const confirmDelete = async () => {
try {
const token =
localStorage.getItem("chat-token");

const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/messages/delete/${message._id}`,
{
method: "DELETE",
headers: {
Authorization: `Bearer ${token}`,
},
}
);

const data = await res.json();

if (data.error) {
throw new Error(data.error);
}

removeMessage(message._id);

toast.success("Message deleted");
} catch (error) {
toast.error(error.message);
}
};

const renderMessageContent = () => {
if (
message.messageType === "image" ||
message.messageType === "gif"
) {
return (
<div className="message-media">
<img
src={message.fileUrl}
alt={
message.fileName || "Image"
}
className="message-image"
/>

{message.message && (
<p className="media-caption">
{message.message}
</p>
)}
</div>
);
}

if (message.messageType === "file") {
return (
<a
href={message.fileUrl}
target="_blank"
rel="noopener noreferrer"
className="message-file"
>
<div className="message-file-icon">
<FiFile />
</div>

<div className="message-file-info">
<span className="message-file-name">
{message.fileName}
</span>

<span className="message-file-type">
{message.fileType}
</span>
</div>

<FiDownload className="message-file-download" />
</a>
);
}

return (
<p className="message-text">
{message.message}
</p>
);
};

return (
<div
className={`message-row ${
fromMe ? "outgoing" : "incoming"
} ${shakeClass}`}
>
{!fromMe && (
<div className="message-avatar">
<img
src={profilePic}
alt={
selectedConversation?.fullName
}
/>
</div>
)}

<div className="message-content">

<div
className={`message-bubble ${
fromMe ? "sent" : "received"
}`}
>

{message.replyTo && (
<div className="replied-message">

<div className="replied-message-header">
<FiCornerUpLeft />

<span>
Replied message
</span>
</div>

<p>
{message.replyTo.message ||
"Attachment"}
</p>

</div>
)}

{renderMessageContent()}

<div className="message-meta">

<span className="message-time">
{formattedTime}
</span>

{message.edited && (
<span className="edited-label">
edited
</span>
)}

{fromMe && (
<span
className={`message-status ${
message.status === "read"
? "read"
: ""
}`}
>
{getMessageStatus()}
</span>
)}

</div>

</div>


<div className="message-actions">

<button
type="button"
className="reply-btn"
onClick={handleReply}
title="Reply"
>
<FiCornerUpLeft />

<span>
Reply
</span>
</button>


{fromMe && (
<>
{message.messageType ===
"text" && (
<button
type="button"
className="edit-btn"
onClick={handleEdit}
title="Edit message"
>
<FiEdit2 />

<span>
Edit
</span>
</button>
)}

<button
type="button"
className="delete-btn"
onClick={handleDelete}
title="Delete message"
>
<FiTrash2 />

<span>
Delete
</span>
</button>
</>
)}

</div>

</div>


{fromMe && (
<div className="message-avatar">

<img
src={profilePic}
alt="You"
/>

</div>
)}

</div>
);
};

export default Message;