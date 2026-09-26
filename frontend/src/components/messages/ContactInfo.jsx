import "../../style/ContactInfo.css";

import {
FiArrowLeft,
FiBell,
FiBookmark,
FiChevronRight,
FiDownload,
FiFile,
FiImage,
FiLink,
FiLock,
FiMoreVertical,
FiSearch,
FiStar,
FiTrash2,
FiUserX,
FiUsers,
FiVolumeX,
} from "react-icons/fi";


const ContactInfo = ({
selectedConversation,
onClose,
}) => {
const user = selectedConversation;

const profilePic =
user?.profilePic ||
"https://via.placeholder.com/150";

const fullName =
user?.fullName || "User";

const username =
user?.username || "username";

return (
<aside className="contact-info">
<div className="contact-info-header">
<button
className="contact-back-btn"
onClick={onClose}
title="Back"
>
<FiArrowLeft />
</button>

<h2>Contact info</h2>

<button
className="contact-more-btn"
title="More"
>
<FiMoreVertical />
</button>
</div>

<div className="contact-info-content">
<section className="contact-profile glass-card">
<div className="contact-profile-image-wrapper">
<img
src={profilePic}
alt={fullName}
className="contact-profile-image"
/>

<span className="contact-online-dot" />
</div>

<h1>{fullName}</h1>

<p>@{username}</p>

<span className="contact-status">
Online
</span>
</section>

<section className="contact-actions glass-card">
<button>
<span className="action-icon">
<FiSearch />
</span>
<span>Search</span>
</button>

<button>
<span className="action-icon">
<FiBell />
</span>
<span>Mute</span>
</button>

<button>
<span className="action-icon">
<FiBookmark />
</span>
<span>Save</span>
</button>
</section>

<section className="contact-section glass-card">
<div className="section-heading">
<div>
<h3>Media, links & docs</h3>
<p>Shared content</p>
</div>

<button>
<span>View all</span>
<FiChevronRight />
</button>
</div>

<div className="media-preview">
<div className="media-item">
<FiImage />
</div>

<div className="media-item">
<FiImage />
</div>

<div className="media-item">
<FiFile />
</div>

<div className="media-item">
<FiLink />
</div>
</div>
</section>

<section className="contact-section glass-card">
<button className="contact-setting-row">
<span className="setting-icon">
<FiBell />
</span>

<span className="setting-content">
<strong>Notifications</strong>
<small>Enabled</small>
</span>

<FiChevronRight />
</button>

<button className="contact-setting-row">
<span className="setting-icon">
<FiImage />
</span>

<span className="setting-content">
<strong>Media visibility</strong>
<small>Default</small>
</span>

<FiChevronRight />
</button>

<button className="contact-setting-row">
<span className="setting-icon">
<FiBookmark />
</span>

<span className="setting-content">
<strong>Bookmarked</strong>
<small>View saved messages</small>
</span>

<FiChevronRight />
</button>
</section>

<section className="contact-section glass-card">
<button className="contact-setting-row">
<span className="setting-icon">
<FiVolumeX />
</span>

<span className="setting-content">
<strong>Mute notifications</strong>
<small>Off</small>
</span>

<span className="setting-toggle" />
</button>

<button className="contact-setting-row">
<span className="setting-icon">
<FiLock />
</span>

<span className="setting-content">
<strong>Encryption</strong>
<small>
Messages are securely encrypted
</small>
</span>

<FiChevronRight />
</button>
</section>

<section className="contact-section glass-card">
<div className="section-heading">
<div>
<h3>Shared groups</h3>
<p>Groups you have in common</p>
</div>

<span className="shared-count">
0
</span>
</div>

<div className="empty-groups">
<div className="empty-groups-icon">
<FiUsers />
</div>

<p>No shared groups yet</p>
</div>
</section>

<section className="contact-danger-section glass-card">
<button className="danger-row">
<span className="danger-icon">
<FiUserX />
</span>

<span>Block {fullName}</span>
</button>

<button className="danger-row">
<span className="danger-icon">
<FiTrash2 />
</span>

<span>Delete chat</span>
</button>
</section>

<div className="contact-info-footer">
<FiLock />
<span>
Your personal messages are private
</span>
</div>
</div>
</aside>
);
};

export default ContactInfo;