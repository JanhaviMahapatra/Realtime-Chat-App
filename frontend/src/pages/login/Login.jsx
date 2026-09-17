import "../../style/Login.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
	<div className="auth-page">
		<div className="auth-layout">

			<div className="auth-banner">
				<div className="banner-content">

					<div className="logo">
						💬
					</div>

					<h1>Welcome Back</h1>

					<p>
						Connect instantly with your friends and teammates in
						one secure place.
					</p>

					<div className="banner-features">
						<div className="feature">
							<span>⚡</span>
							<p>Real-time messaging</p>
						</div>

						<div className="feature">
							<span>🔒</span>
							<p>Secure conversations</p>
						</div>

						<div className="feature">
							<span>🌎</span>
							<p>Always connected</p>
						</div>
					</div>

				</div>
			</div>

			<div className="auth-card">

				<div className="card-header">
					<h2>Login</h2>
					<p>Sign in to continue</p>
				</div>

				<form className="login-form" onSubmit={handleSubmit}>

					<div className="form-group">
						<label>Username</label>

						<input
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="form-group">
						<label>Password</label>

						<input
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
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
						<span>Don't have an account?</span>

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