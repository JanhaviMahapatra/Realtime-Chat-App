import { useState } from "react";
import { FiArrowLeft, FiCamera } from "react-icons/fi";
import "../../style/NewContact.css";

const NewContact = ({ onBack }) => {
const [profilePic, setProfilePic] = useState(null);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");

const handleImageChange = (e) => {
const file = e.target.files?.[0];

if (!file) return;

setProfilePic(URL.createObjectURL(file));
};

const handleSubmit = (e) => {
e.preventDefault();

if (!name.trim() || !phone.trim()) {
return;
}

console.log({
name: name.trim(),
phone: phone.trim(),
profilePic,
});
};

return (
<div className="new-contact">
<div className="new-contact-header">
<button
type="button"
className="new-contact-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>New contact</h1>
</div>

<form className="new-contact-form" onSubmit={handleSubmit}>
<label className="new-contact-photo">
{profilePic ? (
<img src={profilePic} alt="Profile preview" />
) : (
<div className="new-contact-photo-placeholder">
<FiCamera />
</div>
)}

<input
type="file"
accept="image/*"
onChange={handleImageChange}
/>
</label>

<div className="new-contact-field">
<label htmlFor="contact-name">Name</label>

<input
id="contact-name"
type="text"
placeholder="Enter name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
</div>

<div className="new-contact-field">
<label htmlFor="contact-phone">Phone</label>

<input
id="contact-phone"
type="tel"
placeholder="Enter phone number"
value={phone}
onChange={(e) => setPhone(e.target.value)}
/>
</div>

<button type="submit" className="new-contact-save">
Save contact
</button>
</form>
</div>
);
};

export default NewContact;