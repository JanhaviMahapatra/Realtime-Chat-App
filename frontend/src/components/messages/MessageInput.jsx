import "../../style/MessageInput.css";
import { funEmojis } from "../../utils/emojis";

import {
useEffect,
useRef,
useState,
} from "react";

import {
FiPaperclip,
FiSmile,
FiSend,
FiX,
FiEdit2,
FiFile,
FiImage,
FiCheck,
FiCornerUpLeft,
} from "react-icons/fi";

import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const MessageInput = () => {
const [message, setMessage] = useState("");
const [selectedFile, setSelectedFile] = useState(null);
const [showEmojiPicker, setShowEmojiPicker] =
useState(false);

const typingTimeoutRef = useRef(null);
const fileInputRef = useRef(null);

const {
loading,
sendMessage,
} = useSendMessage();

const {
selectedConversation,
replyingTo,
setReplyingTo,
editingMessage,
setEditingMessage,
} = useConversation();

const { socket } = useSocketContext();

useEffect(() => {
if (editingMessage) {
setMessage(editingMessage.message);
setSelectedFile(null);
setReplyingTo(null);
setShowEmojiPicker(false);
}
}, [
editingMessage,
setReplyingTo,
]);

const handleTyping = (e) => {
const value = e.target.value;

setMessage(value);

if (
!socket ||
!socket.connected ||
!selectedConversation?._id
) {
return;
}

if (typingTimeoutRef.current) {
clearTimeout(
typingTimeoutRef.current
);
}

if (value.trim()) {
socket.emit("typing", {
receiverId:
selectedConversation._id,
});

typingTimeoutRef.current =
setTimeout(() => {
if (socket.connected) {
socket.emit("stopTyping", {
receiverId:
selectedConversation._id,
});
}
}, 1000);
} else {
socket.emit("stopTyping", {
receiverId:
selectedConversation._id,
});
}
};

const handleFileSelect = (e) => {
const file = e.target.files?.[0];

if (!file) return;

const maxSize =
10 * 1024 * 1024;

if (file.size > maxSize) {
alert(
"File size cannot exceed 10 MB."
);

e.target.value = "";
return;
}

const allowedTypes = [
"image/jpeg",
"image/jpg",
"image/png",
"image/webp",
"image/gif",
"application/pdf",
"text/plain",
"application/msword",
"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
"application/vnd.ms-excel",
"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
"application/zip",
"application/x-zip-compressed",
];

if (!allowedTypes.includes(file.type)) {
alert(
"This file type is not supported."
);

e.target.value = "";
return;
}

setSelectedFile(file);
setShowEmojiPicker(false);
};

const removeSelectedFile = () => {
setSelectedFile(null);

if (fileInputRef.current) {
fileInputRef.current.value = "";
}
};

const handleEmojiSelect = (emoji) => {
setMessage((prev) => prev + emoji);
setShowEmojiPicker(false);
};

const handleSubmit = async (e) => {
e.preventDefault();

if (editingMessage) {
if (!message.trim()) return;

await handleEdit();

return;
}

if (
!message.trim() &&
!selectedFile
) {
return;
}

try {
await sendMessage(
message,
selectedFile
);

setMessage("");
setSelectedFile(null);
setShowEmojiPicker(false);

if (fileInputRef.current) {
fileInputRef.current.value = "";
}

if (typingTimeoutRef.current) {
clearTimeout(
typingTimeoutRef.current
);
}

socket?.emit("stopTyping", {
receiverId:
selectedConversation?._id,
});

setReplyingTo(null);
} catch (error) {
console.error(
"Error sending message:",
error.message
);
}
};

const handleEdit = async () => {
try {
const token =
localStorage.getItem("chat-token");

const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/messages/edit/${editingMessage._id}`,
{
method: "PUT",
headers: {
"Content-Type":
"application/json",
Authorization: `Bearer ${token}`,
},
body: JSON.stringify({
message:
message.trim(),
}),
}
);

const data =
await res.json();

if (data.error) {
throw new Error(
data.error
);
}

const {
updateMessage,
} = useConversation.getState();

updateMessage(data);

setEditingMessage(null);
setMessage("");
setShowEmojiPicker(false);

if (typingTimeoutRef.current) {
clearTimeout(
typingTimeoutRef.current
);
}

socket?.emit("stopTyping", {
receiverId:
selectedConversation?._id,
});
} catch (error) {
console.error(
"Error editing message:",
error.message
);
}
};

const cancelEdit = () => {
setEditingMessage(null);
setMessage("");
setSelectedFile(null);
setShowEmojiPicker(false);

if (fileInputRef.current) {
fileInputRef.current.value = "";
}

if (typingTimeoutRef.current) {
clearTimeout(
typingTimeoutRef.current
);
}

socket?.emit("stopTyping", {
receiverId:
selectedConversation?._id,
});
};

useEffect(() => {
return () => {
if (typingTimeoutRef.current) {
clearTimeout(
typingTimeoutRef.current
);
}

socket?.emit("stopTyping", {
receiverId:
selectedConversation?._id,
});
};
}, [
socket,
selectedConversation?._id,
]);

return (
<form
className="message-form"
onSubmit={handleSubmit}
>

{editingMessage && (
<div className="reply-preview edit-preview">

<div className="reply-preview-content">

<span className="reply-preview-label">
<FiEdit2 />
Editing message
</span>

<p>
{editingMessage.message}
</p>

</div>

<button
type="button"
className="reply-cancel-btn"
onClick={cancelEdit}
title="Cancel editing"
>
<FiX />
</button>

</div>
)}


{replyingTo &&
!editingMessage && (
<div className="reply-preview">

<div className="reply-preview-content">

<span className="reply-preview-label">
<FiCornerUpLeft />
Replying to
</span>

<p>
{replyingTo.message ||
	"Attachment"}
</p>

</div>

<button
type="button"
className="reply-cancel-btn"
onClick={() =>
setReplyingTo(null)
}
title="Cancel reply"
>
<FiX />
</button>

</div>
)}


{selectedFile &&
!editingMessage && (
<div className="file-preview">

<div className="file-preview-info">

<div className="file-preview-icon">

{selectedFile.type.startsWith(
	"image/"
) ? (
	<FiImage />
) : (
	<FiFile />
)}

</div>

<div className="file-preview-details">

<p>
	{selectedFile.name}
</p>

<span>
	{(
		selectedFile.size /
		1024 /
		1024
	).toFixed(2)}{" "}
	MB
</span>

</div>

</div>

<button
type="button"
className="reply-cancel-btn"
onClick={
removeSelectedFile
}
title="Remove file"
>
<FiX />
</button>

</div>
)}


<input
ref={fileInputRef}
type="file"
hidden
onChange={handleFileSelect}
/>


<div className="composer">

<button
type="button"
className="composer-icon"
title="Attach file"
disabled={!!editingMessage}
onClick={() =>
fileInputRef.current?.click()
}
>
<FiPaperclip />
</button>


<input
type="text"
className="composer-input"
placeholder={
editingMessage
? "Edit your message..."
: "Type your message..."
}
value={message}
onChange={handleTyping}
autoFocus={
!!editingMessage ||
!!replyingTo
}
/>


<div className="emoji-picker-wrapper">

<button
type="button"
className="composer-icon"
title="Emoji"
disabled={!!editingMessage}
onClick={() =>
setShowEmojiPicker(
(prev) => !prev
)
}
>
<FiSmile />
</button>

{showEmojiPicker && (
<div className="emoji-picker">

{funEmojis.map(
(emoji, index) => (
	<button
		key={index}
		type="button"
		className="emoji-option"
		onClick={() =>
			handleEmojiSelect(
				emoji
			)
		}
	>
		{emoji}
	</button>
)
)}

</div>
)}

</div>


<button
type="submit"
className="send-btn"
disabled={loading}
title={
editingMessage
? "Save changes"
: "Send message"
}
>
{loading ? (
<div className="spinner"></div>
) : editingMessage ? (
<FiCheck />
) : (
<FiSend />
)}
</button>

</div>

</form>
);
};

export default MessageInput;