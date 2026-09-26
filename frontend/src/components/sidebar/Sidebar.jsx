import { useState } from "react";

import "../../style/Sidebar.css";

import {
FiMessageSquare,
FiUser,
FiSettings,
} from "react-icons/fi";

import { useAuthContext } from "../../context/AuthContext";

import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ProfileView from "./ProfileView";

import Settings from "../settings/Settings";
import AccountSettings from "../settings/AccountSettings";
import PrivacySettings from "../settings/PrivacySettings";
import PrivacyAdvanced from "../settings/PrivacyAdvanced";
import ChatsSettings from "../settings/ChatsSettings";
import NotificationsSettings from "../settings/NotificationsSettings";
import KeyboardShortcuts from "../settings/KeyboardShortcuts";
import HelpFeedback from "../settings/HelpFeedback";

const Sidebar = () => {
const { authUser } = useAuthContext();

const [activeScreen, setActiveScreen] =
useState("main");

const goToMain = () => {
setActiveScreen("main");
};

const goToSettings = () => {
setActiveScreen("settings");
};

if (activeScreen === "profile") {
return (
<aside className="sidebar">
<ProfileView
onBack={goToMain}
/>
</aside>
);
}

if (activeScreen === "settings") {
return (
<aside className="sidebar">
<Settings
onBack={() => 
setActiveScreen("main")}

onOpenProfile={() =>
setActiveScreen("profile")
}
onOpenAccount={() =>
setActiveScreen("account")
}
onOpenPrivacy={() =>
setActiveScreen("privacy")
}
onOpenChats={() =>
setActiveScreen("chats")
}
onOpenNotifications={() =>
setActiveScreen(
"notifications"
)
}
onOpenShortcuts={() =>
setActiveScreen("shortcuts")
}
onOpenHelp={() =>
setActiveScreen("help")
}
onLogout={() => {}}
/>
</aside>
);
}

if (activeScreen === "account") {
return (
<aside className="sidebar">
<AccountSettings
onBack={goToSettings}
/>
</aside>
);
}

if (activeScreen === "privacy") {
return (
<aside className="sidebar">
<PrivacySettings
onBack={goToSettings}
onOpenAdvanced={() =>
setActiveScreen(
"privacy-advanced"
)
}
/>
</aside>
);
}

if (activeScreen === "privacy-advanced") {
return (
<aside className="sidebar">
<PrivacyAdvanced
onBack={() =>
setActiveScreen("privacy")
}
/>
</aside>
);
}

if (activeScreen === "chats") {
return (
<aside className="sidebar">
<ChatsSettings
onBack={goToSettings}
/>
</aside>
);
}

if (activeScreen === "notifications") {
return (
<aside className="sidebar">
<NotificationsSettings
onBack={goToSettings}
/>
</aside>
);
}

if (activeScreen === "shortcuts") {
return (
<aside className="sidebar">
<KeyboardShortcuts
onBack={goToSettings}
/>
</aside>
);
}

if (activeScreen === "help") {
return (
<aside className="sidebar">
<HelpFeedback
onBack={goToSettings}
/>
</aside>
);
}

return (
<aside className="sidebar">
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
setActiveScreen("profile")
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
<button
type="button"
className="sidebar-settings-button"
onClick={goToSettings}
aria-label="Settings"
title="Settings"
>
<FiSettings />
<span>Settings</span>
</button>

<LogoutButton />
</div>
</aside>
);
};

export default Sidebar;