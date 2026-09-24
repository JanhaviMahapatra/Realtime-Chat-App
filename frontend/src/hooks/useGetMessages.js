import { useEffect, useState } from "react";

import useConversation from "../zustand/useConversation";
import useMarkMessagesAsRead from "./useMarkMessagesAsRead";

import toast from "react-hot-toast";

const useGetMessages = () => {
const [loading, setLoading] = useState(false);

const {
messages,
setMessages,
selectedConversation,
clearUnreadCount,
} = useConversation();

const { markMessagesAsRead } =
useMarkMessagesAsRead();

useEffect(() => {
const getMessages = async () => {
setLoading(true);

try {
const token =
localStorage.getItem(
	"chat-token"
);

const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`,
{
	headers: {
		Authorization: `Bearer ${token}`,
	},
}
);

const data = await res.json();

if (data.error) {
throw new Error(
	data.error
);
}

setMessages(data);

const success =
await markMessagesAsRead(
	selectedConversation._id
);

if (success) {
clearUnreadCount(
	selectedConversation._id
);
}
} catch (error) {
toast.error(
error.message
);
} finally {
setLoading(false);
}
};

if (selectedConversation?._id) {
getMessages();
}
}, [
selectedConversation?._id,
setMessages,
markMessagesAsRead,
clearUnreadCount,
]);

return {
messages,
loading,
};
};

export default useGetMessages;