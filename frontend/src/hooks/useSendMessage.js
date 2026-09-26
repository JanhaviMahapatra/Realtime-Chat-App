import { useState } from "react";

import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
const [loading, setLoading] = useState(false);

const {
setMessages,
selectedConversation,
replyingTo,
} = useConversation();

const sendMessage = async (
message = "",
file = null,
gifUrl = null,
messageType = null
) => {
if (!selectedConversation?._id) {
return;
}

setLoading(true);

try {
const formData = new FormData();

// Add text message if available
if (message.trim()) {
formData.append(
  "message",
  message.trim()
);
}

// Add file/image if available
if (file) {
formData.append(
  "file",
  file
);
}

// Add GIF information
if (gifUrl && messageType === "gif") {
formData.append(
  "gifUrl",
  gifUrl
);

formData.append(
  "messageType",
  "gif"
);
}

// Add reply information
if (replyingTo?._id) {
formData.append(
  "replyTo",
  replyingTo._id
);
}

const token =
localStorage.getItem(
  "chat-token"
);

const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/messages/send/${selectedConversation._id}`,
{
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
}
);

const data =
await res.json();

if (data.error) {
throw new Error(
  data.error
);
}

// Add new message to current chat
setMessages(
(currentMessages) => [
  ...currentMessages,
  data,
]
);

window.dispatchEvent(
new CustomEvent(
  "conversationActivity",
  {
    detail: {
      userId:
        selectedConversation._id,
    },
  }
)
);

return data;
} catch (error) {
toast.error(
error.message
);

throw error;
} finally {
setLoading(false);
}
};

return {
sendMessage,
loading,
};
};

export default useSendMessage;