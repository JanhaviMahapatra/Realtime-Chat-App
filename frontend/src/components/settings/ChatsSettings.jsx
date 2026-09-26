import "../../style/ChatsSettings.css";

import {
FiArrowLeft,
FiChevronRight,
FiImage,
FiCheck,
} from "react-icons/fi";


const ChatsSettings = ({ onBack }) => {
const chatOptions = [
{
id: "theme",
title: "Theme",
value: "Dark",
},
{
id: "wallpaper",
title: "Wallpaper",
value: "Default",
},
{
id: "media-quality",
title: "Media upload quality",
value: "Standard",
},
{
id: "auto-download",
title: "Media auto-download",
value: "Photos and videos",
},
];

return (
<div className="chats-settings">
<div className="chats-settings-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Chats</h1>
</div>

<div className="chats-settings-content">
<section className="chats-settings-section">
{chatOptions.map((option) => (
<button
key={option.id}
type="button"
className="chat-setting-item"
>
<div className="chat-setting-content">
<span className="chat-setting-title">
{option.title}
</span>

<span className="chat-setting-value">
{option.value}
</span>
</div>

<FiChevronRight className="chat-setting-chevron" />
</button>
))}
</section>

<section className="chats-settings-section">
<div className="chat-setting-toggle">
<div className="chat-setting-content">
<span className="chat-setting-title">
Spell check
</span>

<span className="chat-setting-description">
Check spelling while typing messages.
</span>
</div>

<label className="chat-setting-switch">
<input
type="checkbox"
defaultChecked
/>
<span />
</label>
</div>

<div className="chat-setting-toggle">
<div className="chat-setting-content">
<span className="chat-setting-title">
Replace text with emoji
</span>

<span className="chat-setting-description">
Automatically replace supported text
with emoji while typing.
</span>
</div>

<label className="chat-setting-switch">
<input
type="checkbox"
defaultChecked
/>
<span />
</label>
</div>

<div className="chat-setting-toggle">
<div className="chat-setting-content">
<span className="chat-setting-title">
Enter is send
</span>

<span className="chat-setting-description">
Press Enter to send a message instead
of creating a new line.
</span>
</div>

<label className="chat-setting-switch">
<input
type="checkbox"
defaultChecked
/>
<span />
</label>
</div>
</section>

<section className="chats-settings-section wallpaper-card">
<div className="wallpaper-preview">
<div className="wallpaper-preview-overlay">
<FiImage />
</div>
</div>

<div className="wallpaper-info">
<span>Chat wallpaper</span>
<small>
Customize the background of your
conversations.
</small>
</div>

<FiCheck className="wallpaper-check" />
</section>
</div>
</div>
);
};

export default ChatsSettings;