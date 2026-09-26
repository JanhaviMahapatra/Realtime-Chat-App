import { useState } from "react";
import "../../style/Sidebar.css";

import {
FiMessageSquare,
FiUser,
} from "react-icons/fi";

import { useAuthContext } from "../../context/AuthContext";

import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ProfileView from "./ProfileView";

const Sidebar = () => {
const { authUser } = useAuthContext();

const [showProfile, setShowProfile] =
useState(false);

return (
<aside className="sidebar">
{showProfile ? (
<ProfileView
onBack={() =>
setShowProfile(false)
}
/>
) : (
<>
<div className="sidebar-top">

<div className="sidebar-brand">

<div className="brand-logo">
<FiMessageSquare />
</div>

<div className="brand-info">
<h2>ChatApp</h2>
<p>Stay connected</p>
</div>

</div>

<button
type="button"
className="sidebar-profile-trigger"
onClick={() =>
setShowProfile(true)
}
>
<div className="sidebar-profile-avatar">
{authUser?.profilePic ? (
<img
src={authUser.profilePic}
alt={authUser.fullName}
/>
) : (
<FiUser />
)}
</div>

<div className="sidebar-profile-info">
<strong>
{authUser?.fullName ||
"My Profile"}
</strong>

<span>
@
{authUser?.username ||
"username"}
</span>
</div>

<span className="sidebar-profile-arrow">
›
</span>
</button>

<SearchInput />

</div>

<div className="sidebar-divider"></div>

<div className="sidebar-section-header">
<div className="sidebar-section-title">
<h3>Chats</h3>

</div>

<button
type="button"
className="sidebar-new-chat"
aria-label="New chat"
title="New chat"
>
<FiMessageSquare />
</button>
</div>

<div className="sidebar-conversations">
<Conversations />
</div>

<div className="sidebar-footer">
<LogoutButton />
</div>
</>
)}
</aside>
);
};

export default Sidebar;