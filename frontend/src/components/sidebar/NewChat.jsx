import { useEffect, useMemo, useState } from "react";
import {
FiArrowLeft,
FiChevronRight,
FiMessageCircle,
FiPlus,
FiSearch,
FiUsers,
} from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../hooks/useGetUsers";
import "../../style/NewChat.css";

const NewChat = ({
onBack,
onNewContact,
onNewGroup,
onNewCommunity,
}) => {
const { authUser } = useAuthContext();
const { loading, users, getUsers } = useGetUsers();

const setSelectedConversation = useConversation(
(state) => state.setSelectedConversation
);

const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
getUsers();
}, []);

const filteredUsers = useMemo(() => {
const query = searchQuery.trim().toLowerCase();

if (!query) {
return users;
}

return users.filter(
(user) =>
(user.fullName?.toLowerCase() || "").includes(query) ||
(user.username?.toLowerCase() || "").includes(query)
);
}, [users, searchQuery]);

const groupedUsers = useMemo(() => {
const groups = {};

const sortedUsers = [...filteredUsers].sort((a, b) =>
(a.fullName || "").localeCompare(b.fullName || "")
);

sortedUsers.forEach((user) => {
const firstCharacter =
user.fullName?.trim().charAt(0).toUpperCase() || "#";

const section = /[A-Z]/.test(firstCharacter)
? firstCharacter
: "#";

if (!groups[section]) {
groups[section] = [];
}

groups[section].push(user);
});

return groups;
}, [filteredUsers]);

const handleSelectUser = (user) => {
setSelectedConversation(user);
onBack();
};

return (
<div className="new-chat">
<div className="new-chat-header">
<button
type="button"
className="new-chat-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>New chat</h1>
</div>

<div className="new-chat-search">
<div className="new-chat-search-box">
<FiSearch />

<input
type="text"
placeholder="Search name, number or @username"
value={searchQuery}
onChange={(e) =>
setSearchQuery(e.target.value)
}
/>
</div>
</div>

<div className="new-chat-actions">
<button
type="button"
className="new-chat-action"
onClick={onNewGroup}
>
<div className="new-chat-action-icon">
<FiUsers />
<FiPlus className="action-plus" />
</div>

<span>New group</span>

<FiChevronRight />
</button>

<button
type="button"
className="new-chat-action"
onClick={onNewContact}
>
<div className="new-chat-action-icon">
<FiMessageCircle />
<FiPlus className="action-plus" />
</div>

<span>New contact</span>

<FiChevronRight />
</button>

<button
type="button"
className="new-chat-action"
onClick={onNewCommunity}
>
<div className="new-chat-action-icon">
<FiUsers />
<FiPlus className="action-plus" />
</div>

<span>New community</span>

<FiChevronRight />
</button>
</div>

<div className="new-chat-contacts">
{loading ? (
<div className="new-chat-loading">
Loading contacts...
</div>
) : Object.keys(groupedUsers).length === 0 ? (
<div className="new-chat-empty">
{searchQuery
? "No contacts found"
: "No contacts available"}
</div>
) : (
Object.entries(groupedUsers).map(
([letter, contactList]) => (
<div
className="new-chat-contact-group"
key={letter}
>
<div className="new-chat-section-letter">
{letter}
</div>

{contactList.map((user) => (
<button
type="button"
className="new-chat-contact"
key={user._id}
onClick={() =>
handleSelectUser(user)
}
>
<img
src={
user.profilePic ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(
user.fullName ||
"User"
)}`
}
alt={
user.fullName ||
"User"
}
className="new-chat-contact-avatar"
/>

<div className="new-chat-contact-info">
<div className="new-chat-contact-name">
<span>
{user._id ===
authUser?._id
? "You"
: user.fullName}
</span>
</div>

<span className="new-chat-contact-username">
@{user.username}
</span>
</div>
</button>
))}
</div>
)
)
)}
</div>
</div>
);
};

export default NewChat;