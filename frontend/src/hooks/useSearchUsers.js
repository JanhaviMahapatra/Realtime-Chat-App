import { useState } from "react";
import toast from "react-hot-toast";

const useSearchUsers = () => {
const [loading, setLoading] = useState(false);
const [users, setUsers] = useState([]);

const searchUsers = async (query) => {
if (!query.trim()) {
  setUsers([]);
  return;
}

setLoading(true);

try {
  // Can also use axios instead of fetch
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/search?query=${encodeURIComponent(query.trim())}`,
    {
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  setUsers(data);
} catch (error) {
  toast.error(error.message);
  setUsers([]);
} finally {
  setLoading(false);
}
};

const clearResults = () => {
setUsers([]);
};

return {
loading,
users,
searchUsers,
clearResults,
};
};

export default useSearchUsers;