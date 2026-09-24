	import "../../style/Login.css";

	import { useState } from "react";
	import { Link } from "react-router-dom";

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

	import useLogin from "../../hooks/useLogin";

	const Login = () => {
	const [username, setUsername] =
	useState("");

	const [password, setPassword] =
	useState("");

	const [showPassword, setShowPassword] =
	useState(false);

	const {
	loading,
	login,
	} = useLogin();

	const handleSubmit = async (e) => {
	e.preventDefault();

	await login(
	username,
	password
	);
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
	Welcome Back
	</h1>

	<p>
	Connect instantly with your
	friends and teammates in one
	secure place.
	</p>

	<div className="banner-features">

	<div className="feature">
	<div className="feature-icon">
	<FiZap />
	</div>

	<div>
	<h4>
	Real-time messaging
	</h4>

	<p>
	Stay connected with
	instant conversations.
	</p>
	</div>
	</div>

	<div className="feature">
	<div className="feature-icon">
	<FiLock />
	</div>

	<div>
	<h4>
	Secure conversations
	</h4>

	<p>
	Your conversations stay
	private and protected.
	</p>
	</div>
	</div>

	<div className="feature">
	<div className="feature-icon">
	<FiGlobe />
	</div>

	<div>
	<h4>
	Always connected
	</h4>

	<p>
	Keep your conversations
	within reach.
	</p>
	</div>
	</div>

	</div>

	</div>

	</div>

	<div className="auth-card">

	<div className="card-header">
	<span className="card-eyebrow">
	CHATAPP
	</span>

	<h2>
	Sign in
	</h2>

	<p>
	Sign in to continue to your
	conversations.
	</p>
	</div>

	<form
	className="login-form"
	onSubmit={handleSubmit}
	>

	<div className="form-group">

	<label htmlFor="username">
	Username
	</label>

	<input
	id="username"
	type="text"
	placeholder="Enter your username"
	value={username}
	onChange={(e) =>
	setUsername(
	e.target.value
	)
	}
	autoComplete="username"
	/>

	</div>

	<div className="form-group">

	<label htmlFor="password">
	Password
	</label>

	<div className="password-wrapper">

	<input
	id="password"
	type={
	showPassword
	? "text"
	: "password"
	}
	placeholder="Enter your password"
	value={password}
	onChange={(e) =>
	setPassword(
	e.target.value
	)
	}
	autoComplete="current-password"
	/>

	<button
	type="button"
	className="password-toggle"
	onClick={() =>
	setShowPassword(
	(prev) => !prev
	)
	}
	title={
	showPassword
	? "Hide password"
	: "Show password"
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

	<button
	type="submit"
	className="login-btn"
	disabled={loading}
	>
	{loading ? (
	<div className="spinner"></div>
	) : (
	"Sign In"
	)}
	</button>

	<div className="auth-footer">

	<span>
	Don't have an account?
	</span>

	<Link to="/signup">
	Create one
	</Link>

	</div>

	</form>

	</div>

	</div>

	</div>
	);
	};

	export default Login;