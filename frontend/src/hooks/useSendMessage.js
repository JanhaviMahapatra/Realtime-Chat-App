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
file = null
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

  // Add file/image/GIF if available
  if (file) {
    formData.append(
      "file",
      file
    );
  }

  // Add reply information
  if (replyingTo?._id) {
    formData.append(
      "replyTo",
      replyingTo._id
    );
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/messages/send/${selectedConversation._id}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  // Add new message to current chat
  setMessages((currentMessages) => [
    ...currentMessages,
    data,
  ]);

  return data;
} catch (error) {
  toast.error(error.message);
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