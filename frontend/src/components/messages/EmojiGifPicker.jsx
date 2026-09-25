import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiGifPicker = ({ onEmojiSelect }) => {
const [activeTab, setActiveTab] =
useState("emoji");

return (
<div className="emoji-gif-picker">
<div className="picker-tabs">
<button
type="button"
className={
activeTab === "emoji"
? "active"
: ""
}
onClick={() =>
setActiveTab("emoji")
}
>
Emoji
</button>

<button
type="button"
className={
activeTab === "gif"
? "active"
: ""
}
onClick={() =>
setActiveTab("gif")
}
>
GIFs
</button>
</div>

{activeTab === "emoji" && (
<EmojiPicker
onEmojiClick={(emojiData) =>
onEmojiSelect(
emojiData.emoji
)
}
theme="dark"
width="100%"
height={350}
/>
)}

{activeTab === "gif" && (
<div className="gif-placeholder">
GIF picker coming next...
</div>
)}
</div>
);
};

export default EmojiGifPicker;