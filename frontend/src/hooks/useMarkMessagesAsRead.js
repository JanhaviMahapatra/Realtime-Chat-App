import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useMarkMessagesAsRead = () => {
	const [loading, setLoading] = useState(false);

const markMessagesAsRead = useCallback(async (senderId) => {
if (!senderId) return;

setLoading(true);

try {
const res = await fetch(
	`${import.meta.env.VITE_API_URL}/api/messages/read/${senderId}`,
	{
		method: "POST",
	}
);

	const data = await res.json();

	if (data.error) {
		throw new Error(data.error);
	}

	return data;
} catch (error) {
	toast.error(error.message);
} finally {
	setLoading(false);
}
}, []);

return {
markMessagesAsRead,
loading,
};
};

export default useMarkMessagesAsRead;