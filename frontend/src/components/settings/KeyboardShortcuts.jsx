import "../../style/KeyboardShortcuts.css";


import {
FiArrowLeft,
FiCommand,
} from "react-icons/fi";


const KeyboardShortcuts = ({ onBack }) => {
const shortcuts = [
{
keys: ["Ctrl", "K"],
title: "Search conversations",
},
{
keys: ["Ctrl", "N"],
title: "Start a new chat",
},
{
keys: ["Ctrl", "Enter"],
title: "Send message",
},
{
keys: ["Esc"],
title: "Close current panel",
},
{
keys: ["/"],
title: "Focus search",
},
];

return (
<div className="keyboard-shortcuts">
<div className="keyboard-shortcuts-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Keyboard shortcuts</h1>
</div>

<div className="keyboard-shortcuts-content">
<div className="keyboard-shortcuts-intro">
<div className="keyboard-shortcuts-icon">
<FiCommand />
</div>

<div>
<h2>Quick actions</h2>

<p>
Use these keyboard shortcuts to navigate
ChatApp faster.
</p>
</div>
</div>

<div className="shortcut-list">
{shortcuts.map((shortcut) => (
<div
key={shortcut.title}
className="shortcut-item"
>
<span className="shortcut-title">
{shortcut.title}
</span>

<div className="shortcut-keys">
{shortcut.keys.map((key) => (
<kbd key={key}>{key}</kbd>
))}
</div>
</div>
))}
</div>
</div>
</div>
);
};

export default KeyboardShortcuts;