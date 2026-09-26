import "../../style/PrivacySettings.css";

import {
FiArrowLeft,
FiChevronRight,
FiLock,
} from "react-icons/fi";


const PrivacySettings = ({
onBack,
onOpenAdvanced,
}) => {
const privacyOptions = [
{
id: "last-seen",
title: "Last seen and online",
value: "Nobody",
},
{
id: "profile-picture",
title: "Profile picture",
value: "My contacts",
},
{
id: "about",
title: "About",
value: "My contacts",
},
{
id: "status",
title: "Status",
value: "1 contact included",
},
];

const secondaryOptions = [
{
id: "message-timer",
title: "Default message timer",
value: "Off",
},
{
id: "groups",
title: "Groups",
value: "Everyone",
},
{
id: "blocked",
title: "Blocked contacts",
value: "0",
},
{
id: "app-lock",
title: "App lock",
value: "Require password to unlock ChatApp",
},
];

return (
<div className="privacy-settings">
<div className="privacy-settings-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Privacy</h1>
</div>

<div className="privacy-settings-content">
<section className="privacy-section">
<h2>Who can see my personal info</h2>

<div className="privacy-options">
{privacyOptions.map((option) => (
<button
key={option.id}
type="button"
className="privacy-option"
>
<div className="privacy-option-content">
<span className="privacy-option-title">
{option.title}
</span>

<span className="privacy-option-value">
{option.value}
</span>
</div>

<FiChevronRight className="privacy-chevron" />
</button>
))}
</div>
</section>

<section className="privacy-section">
<div className="privacy-toggle-row">
<div className="privacy-toggle-content">
<span className="privacy-option-title">
Read receipts
</span>

<p>
If turned off, you won't send or
receive read receipts. Read receipts
are always sent for group chats.
</p>
</div>

<label className="privacy-switch">
<input
type="checkbox"
defaultChecked
/>

<span className="privacy-slider" />
</label>
</div>
</section>

<section className="privacy-section">
<h2>Disappearing messages</h2>

<div className="privacy-options">
{secondaryOptions.map((option) => (
<button
key={option.id}
type="button"
className="privacy-option"
>
<div className="privacy-option-content">
<span className="privacy-option-title">
{option.title}
</span>

<span className="privacy-option-value">
{option.value}
</span>
</div>

<FiChevronRight className="privacy-chevron" />
</button>
))}
</div>
</section>

<section className="privacy-section privacy-advanced-section">
<button
type="button"
className="privacy-advanced-button"
onClick={onOpenAdvanced}
>
<FiLock />

<div>
<span>Advanced</span>
<small>
More privacy and security controls
</small>
</div>

<FiChevronRight />
</button>
</section>
</div>
</div>
);
};

export default PrivacySettings;