import "../../style/SignUp.css";

import { Link } from "react-router-dom";
import { useState } from "react";

import {
IoEye,
IoEyeOff,
} from "react-icons/io5";

import {
FiMessageSquare,
FiZap,
FiLock,
FiGlobe,
} from "react-icons/fi";

import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
const [inputs, setInputs] = useState({
fullName: "",
username: "",
password: "",
confirmPassword: "",
gender: "",
});

const [showPassword, setShowPassword] =
useState(false);

const [showConfirmPassword, setShowConfirmPassword] =
useState(false);

const {
loading,
signup,
} = useSignup();

const handleCheckboxChange = (gender) => {
setInputs({
...inputs,
gender,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

await signup(inputs);
};

return (
<div className="auth-page">

<div className="auth-layout">

<div className="auth-banner">

<div className="banner-content">

<div className="logo">
<FiMessageSquare />
</div>

<h1>
Create your account
</h1>

<p>
Join ChatApp and experience
fast, secure, real-time
conversations with friends
and teammates.
</p>

<div className="banner-features">

<div className="feature">
<div className="feature-icon">
<FiZap />
</div>

<div>
<h4>
Instant messaging
</h4>

<p>
Stay connected with
real-time conversations.
</p>
</div>
</div>

<div className="feature">
<div className="feature-icon">
<FiLock />
</div>

<div>
<h4>
Private & secure
</h4>

<p>
Your conversations stay
protected.
</p>
</div>
</div>

<div className="feature">
<div className="feature-icon">
<FiGlobe />
</div>

<div>
<h4>
Available everywhere
</h4>

<p>
Keep your chats within
reach.
</p>
</div>
</div>

</div>

</div>

</div>

<div className="auth-card signup-card">

<div className="card-header">

<span className="card-eyebrow">
CHATAPP
</span>

<h2>
Create Account
</h2>

<p>
Fill in your details to get
started.
</p>

</div>

<form
className="signup-form"
onSubmit={handleSubmit}
>

<div className="form-grid">

<div className="form-group">

<label htmlFor="fullName">
Full Name
</label>

<input
id="fullName"
type="text"
placeholder="John Doe"
value={inputs.fullName}
onChange={(e) =>
setInputs({
...inputs,
fullName:
e.target.value,
})
}
autoComplete="name"
/>

</div>

<div className="form-group">

<label htmlFor="username">
Username
</label>

<input
id="username"
type="text"
placeholder="johndoe"
value={inputs.username}
onChange={(e) =>
setInputs({
...inputs,
username:
e.target.value,
})
}
autoComplete="username"
/>

</div>

<div className="form-group">

<label htmlFor="signup-password">
Password
</label>

<div className="password-wrapper">

<input
id="signup-password"
type={
showPassword
? "text"
: "password"
}
placeholder="Enter password"
value={inputs.password}
onChange={(e) =>
setInputs({
...inputs,
password:
e.target.value,
})
}
autoComplete="new-password"
/>

<button
type="button"
className="password-toggle"
onClick={() =>
setShowPassword(
(prev) => !prev
)
}
aria-label={
showPassword
? "Hide password"
: "Show password"
}
>
{showPassword ? (
<IoEyeOff />
) : (
<IoEye />
)}
</button>

</div>

</div>

<div className="form-group">

<label htmlFor="confirm-password">
Confirm Password
</label>

<div className="password-wrapper">

<input
id="confirm-password"
type={
showConfirmPassword
? "text"
: "password"
}
placeholder="Confirm password"
value={
inputs.confirmPassword
}
onChange={(e) =>
setInputs({
...inputs,
confirmPassword:
e.target.value,
})
}
autoComplete="new-password"
/>

<button
type="button"
className="password-toggle"
onClick={() =>
setShowConfirmPassword(
(prev) => !prev
)
}
aria-label={
showConfirmPassword
? "Hide password"
: "Show password"
}
>
{showConfirmPassword ? (
<IoEyeOff />
) : (
<IoEye />
)}
</button>

</div>

</div>

</div>

<div className="gender-section">

<label className="gender-label">
Gender
</label>

<GenderCheckbox
onCheckboxChange={
handleCheckboxChange
}
selectedGender={
inputs.gender
}
/>

</div>

<button
type="submit"
className="signup-btn"
disabled={loading}
>
{loading ? (
<div className="spinner"></div>
) : (
"Create Account"
)}
</button>

<div className="auth-footer">

<span>
Already have an account?
</span>

<Link to="/login">
Sign In
</Link>

</div>

</form>

</div>

</div>

</div>
);
};

export default SignUp;