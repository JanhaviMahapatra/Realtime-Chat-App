import { useState } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
const [loading, setLoading] =
useState(false);

const [users, setUsers] =
useState([]);

const getUsers = async () => {
setLoading(true);

try {
const token =
localStorage.getItem(
  "chat-token"
);

const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/users`,
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

setUsers(
Array.isArray(data)
  ? data
  : []
);
} catch (error) {
console.error(
"Error fetching users:",
error.message
);

setUsers([]);

toast.error(
error.message ||
  "Failed to load users"
);
} finally {
setLoading(false);
}
};

return {
loading,
users,
getUsers,
};
};

export default useGetUsers;