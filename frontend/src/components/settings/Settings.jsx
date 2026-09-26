import {
FiArrowLeft,
FiUser,
FiKey,
FiShield,
FiMessageSquare,
FiBell,
FiCommand,
FiHelpCircle,
FiLogOut,
} from "react-icons/fi";

import "../../style/Settings.css";

const Settings = ({
onBack,
onOpenProfile,
onOpenAccount,
onOpenPrivacy,
onOpenChats,
onOpenNotifications,
onOpenShortcuts,
onOpenHelp,
onLogout,
}) => {
const settingsItems = [
{
id: "profile",
icon: <FiUser />,
title: "Profile",
description: "Name, profile picture, username",
onClick: onOpenProfile,
},
{
id: "account",
icon: <FiKey />,
title: "Account",
description: "Security notifications, account info",
onClick: onOpenAccount,
},
{
id: "privacy",
icon: <FiShield />,
title: "Privacy",
description: "Blocked contacts, disappearing messages",
onClick: onOpenPrivacy,
},
{
id: "chats",
icon: <FiMessageSquare />,
title: "Chats",
description: "Theme, wallpaper, chat settings",
onClick: onOpenChats,
},
{
id: "notifications",
icon: <FiBell />,
title: "Notifications",
description: "Messages, groups, sounds",
onClick: onOpenNotifications,
},
{
id: "shortcuts",
icon: <FiCommand />,
title: "Keyboard shortcuts",
description: "Quick actions",
onClick: onOpenShortcuts,
},
{
id: "help",
icon: <FiHelpCircle />,
title: "Help and feedback",
description: "Help center, contact us, privacy policy",
onClick: onOpenHelp,
},
];

return (
<div className="settings-page">
<div className="settings-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Settings</h1>
</div>

<div className="settings-list">
{settingsItems.map((item) => (
<button
key={item.id}
type="button"
className="settings-item"
onClick={item.onClick}
>
<div className="settings-item-icon">
{item.icon}
</div>

<div className="settings-item-content">
<span className="settings-item-title">
{item.title}
</span>

<span className="settings-item-description">
{item.description}
</span>
</div>
</button>
))}

<button
type="button"
className="settings-item settings-logout"
onClick={onLogout}
>
<div className="settings-item-icon">
<FiLogOut />
</div>

<div className="settings-item-content">
<span className="settings-item-title">
Log out
</span>
</div>
</button>
</div>
</div>
);
};

export default Settings;