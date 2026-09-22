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
} = useConversation();

const { markMessagesAsRead } = useMarkMessagesAsRead();

useEffect(() => {
const getMessages = async () => {
	setLoading(true);

	try {
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`,
			{
				credentials:"include"
			}
		);

		const data = await res.json();

		if (data.error) {
			throw new Error(data.error);
		}

		setMessages(data);

		// Mark messages from the selected user as read
		await markMessagesAsRead(
			selectedConversation._id
		);
	} catch (error) {
		toast.error(error.message);
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
]);

return {
messages,
loading,
};
};

export default useGetMessages;