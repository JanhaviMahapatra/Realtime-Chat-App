import "../../style/PrivacyAdvanced.css";

import {
FiArrowLeft,
FiChevronRight,
} from "react-icons/fi";


const PrivacyAdvanced = ({ onBack }) => {
const advancedOptions = [
{
id: "unknown-messages",
title: "Block unknown account messages",
description:
"Protect your account from unwanted messages from unknown accounts.",
},
{
id: "protect-ip",
title: "Protect IP address in calls",
description:
"Calls will be relayed through ChatApp servers to help protect your IP address.",
},
{
id: "link-previews",
title: "Turn off link previews",
description:
"Don't generate previews when you share links in chats.",
},
];

return (
<div className="privacy-advanced">
<div className="privacy-advanced-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Advanced</h1>
</div>

<div className="privacy-advanced-content">
<p className="privacy-advanced-intro">
These additional privacy options give you
more control over how your account and
conversations are handled.
</p>

<div className="privacy-advanced-list">
{advancedOptions.map((option) => (
<button
key={option.id}
type="button"
className="privacy-advanced-option"
>
<div className="privacy-advanced-option-content">
<span className="privacy-advanced-option-title">
{option.title}
</span>

<span className="privacy-advanced-option-description">
{option.description}
</span>
</div>

<FiChevronRight className="privacy-advanced-chevron" />
</button>
))}
</div>
</div>
</div>
);
};

export default PrivacyAdvanced;