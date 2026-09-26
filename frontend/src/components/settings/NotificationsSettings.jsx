import {
FiArrowLeft,
FiChevronRight,
} from "react-icons/fi";

import "../../style/NotificationsSettings.css";

const NotificationsSettings = ({ onBack }) => {
const notificationOptions = [
{
id: "messages",
title: "Messages",
description: "Message notifications and sounds",
},
{
id: "groups",
title: "Groups",
description: "Group message notifications and sounds",
},
{
id: "calls",
title: "Calls",
description: "Incoming call notifications",
},
];

return (
<div className="notifications-settings">
<div className="notifications-settings-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Notifications</h1>
</div>

<div className="notifications-settings-content">
<section className="notifications-section">
{notificationOptions.map((option) => (
<button
key={option.id}
type="button"
className="notification-option"
>
<div className="notification-option-content">
<span className="notification-option-title">
{option.title}
</span>

<span className="notification-option-description">
{option.description}
</span>
</div>

<FiChevronRight className="notification-chevron" />
</button>
))}
</section>

<section className="notifications-section">
<div className="notification-toggle">
<div className="notification-toggle-content">
<span className="notification-option-title">
Show previews
</span>

<span className="notification-option-description">
Show message content in notifications.
</span>
</div>

<label className="notification-switch">
<input
type="checkbox"
defaultChecked
/>
<span />
</label>
</div>

<div className="notification-toggle">
<div className="notification-toggle-content">
<span className="notification-option-title">
Play sound for outgoing messages
</span>

<span className="notification-option-description">
Play a sound when your message is sent.
</span>
</div>

<label className="notification-switch">
<input
type="checkbox"
defaultChecked
/>
<span />
</label>
</div>

<div className="notification-toggle">
<div className="notification-toggle-content">
<span className="notification-option-title">
Background notifications
</span>

<span className="notification-option-description">
Receive notifications when ChatApp is
not open.
</span>
</div>

<label className="notification-switch">
<input
type="checkbox"
defaultChecked
/>
<span />
</label>
</div>
</section>
</div>
</div>
);
};

export default NotificationsSettings;