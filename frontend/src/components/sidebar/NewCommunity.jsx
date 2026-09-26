import { FiArrowLeft, FiUsers } from "react-icons/fi";
import "../../style/NewCommunity.css";

const NewCommunity = ({ onBack }) => {
return (
<div className="new-community">
<div className="new-community-header">
<button
type="button"
className="new-community-back-button"
onClick={onBack}
aria-label="Back"
>
<FiArrowLeft />
</button>

<h1>New community</h1>
</div>

<div className="new-community-content">
<div className="new-community-icon">
<FiUsers />
</div>

<h2>Create a community</h2>

<p>
Bring people together in one place to
organize conversations, groups, and
shared interests.
</p>

<button
type="button"
className="new-community-create"
>
Create community
</button>
</div>
</div>
);
};

export default NewCommunity;