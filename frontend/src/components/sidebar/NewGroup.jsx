import { useMemo, useState } from "react";
import { FiArrowLeft, FiCheck, FiSearch } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";
import useGetUsers from "../../hooks/useGetUsers";
import "../../style/NewGroup.css";

const NewGroup = ({ onBack }) => {
const { authUser } = useAuthContext();
const { loading, users } = useGetUsers();

const [searchQuery, setSearchQuery] = useState("");
const [selectedUsers, setSelectedUsers] = useState([]);

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

const handleToggleUser = (user) => {
setSelectedUsers((current) => {
const alreadySelected = current.some(
(selected) => selected._id === user._id
);

if (alreadySelected) {
return current.filter(
(selected) => selected._id !== user._id
);
}

return [...current, user];
});
};

return (
<div className="new-group">
<div className="new-group-header">
<button
type="button"
className="new-group-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<div className="new-group-header-info">
<h1>New group</h1>
<span>
{selectedUsers.length > 0
? `${selectedUsers.length} selected`
: "Add participants"}
</span>
</div>
</div>

<div className="new-group-search">
<div className="new-group-search-box">
<FiSearch />

<input
type="text"
placeholder="Search contacts"
value={searchQuery}
onChange={(e) =>
setSearchQuery(e.target.value)
}
/>
</div>
</div>

<div className="new-group-list">
{loading ? (
<div className="new-group-message">
Loading contacts...
</div>
) : filteredUsers.length === 0 ? (
<div className="new-group-message">
No contacts found
</div>
) : (
filteredUsers
.filter(
(user) =>
user._id !== authUser?._id
)
.map((user) => {
const isSelected =
selectedUsers.some(
(selected) =>
selected._id ===
user._id
);

return (
<button
type="button"
className={`new-group-contact ${
isSelected
? "selected"
: ""
}`}
key={user._id}
onClick={() =>
handleToggleUser(user)
}
>
<img
src={user.profilePic}
alt={
user.fullName ||
"User"
}
className="new-group-avatar"
/>

<div className="new-group-contact-info">
<strong>
{user.fullName}
</strong>

<span>
@
{user.username}
</span>
</div>

<div
className={`new-group-checkbox ${
isSelected
? "checked"
: ""
}`}
>
{isSelected && (
<FiCheck />
)}
</div>
</button>
);
})
)}
</div>

<div className="new-group-footer">
<button
type="button"
className="new-group-next"
disabled={selectedUsers.length === 0}
>
Next
</button>
</div>
</div>
);
};

export default NewGroup;