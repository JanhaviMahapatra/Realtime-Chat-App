import "../../style/AccountSettings.css";

import {
FiArrowLeft,
FiShield,
FiFileText,
FiInfo,
} from "react-icons/fi";


const AccountSettings = ({ onBack }) => {
const accountOptions = [
{
id: "security",
icon: <FiShield />,
title: "Security notifications",
},
{
id: "account-info",
icon: <FiFileText />,
title: "Request account info",
},
{
id: "delete-account",
icon: <FiInfo />,
title: "How to delete my account",
},
];

return (
<div className="account-settings">
<div className="account-settings-header">
<button
type="button"
className="settings-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>Account</h1>
</div>

<div className="account-settings-list">
{accountOptions.map((option) => (
<button
key={option.id}
type="button"
className="account-settings-item"
>
<div className="account-settings-icon">
{option.icon}
</div>

<span className="account-settings-title">
{option.title}
</span>

<span className="account-settings-arrow">
›
</span>
</button>
))}
</div>
</div>
);
};

export default AccountSettings;