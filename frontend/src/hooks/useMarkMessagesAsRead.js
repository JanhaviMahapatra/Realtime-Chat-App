import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const useMarkMessagesAsRead = () => {
const [loading, setLoading] = useState(false);

const markMessagesAsRead = useCallback(
async (senderId) => {
if (!senderId) return false;

setLoading(true);

try {
const token =
localStorage.getItem("chat-token");

const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/messages/read/${senderId}`,
{
method: "POST",
headers: {
Authorization: `Bearer ${token}`,
},
}
);

const data = await res.json();

if (!res.ok || data.error) {
throw new Error(
data.error ||
"Failed to mark messages as read"
);
}

return true;
} catch (error) {
console.error(
"Error marking messages as read:",
error.message
);

toast.error(error.message);

return false;
} finally {
setLoading(false);
}
},
[]
);

return {
markMessagesAsRead,
loading,
};
};

export default useMarkMessagesAsRead;