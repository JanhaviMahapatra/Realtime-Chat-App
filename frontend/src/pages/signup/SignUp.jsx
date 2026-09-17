import "../../style/SignUp.css";

import { Link } from "react-router-dom";
import { useState } from "react";

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

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
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
						💬
					</div>

					<h1>Create your account</h1>

					<p>
						Join ChatApp and experience fast, secure, real-time conversations
						with friends and teammates.
					</p>

					<div className="banner-features">

						<div className="feature">
							<span>⚡</span>
							<p>Instant messaging</p>
						</div>

						<div className="feature">
							<span>🔒</span>
							<p>Private & secure</p>
						</div>

						<div className="feature">
							<span>🌍</span>
							<p>Available everywhere</p>
						</div>

					</div>

				</div>

			</div>

			<div className="auth-card">

				<div className="card-header">
					<h2>Create Account</h2>
					<p>Fill in your details to get started</p>
				</div>

				<form
					className="signup-form"
					onSubmit={handleSubmit}
				>

					<div className="form-grid">

						<div className="form-group">
							<label>Full Name</label>

							<input
								type="text"
								placeholder="John Doe"
								value={inputs.fullName}
								onChange={(e) =>
									setInputs({
										...inputs,
										fullName: e.target.value,
									})
								}
							/>
						</div>

						<div className="form-group">
							<label>Username</label>

							<input
								type="text"
								placeholder="johndoe"
								value={inputs.username}
								onChange={(e) =>
									setInputs({
										...inputs,
										username: e.target.value,
									})
								}
							/>
						</div>

						<div className="form-group">
							<label>Password</label>

							<input
								type="password"
								placeholder="Enter password"
								value={inputs.password}
								onChange={(e) =>
									setInputs({
										...inputs,
										password: e.target.value,
									})
								}
							/>
						</div>

						<div className="form-group">
							<label>Confirm Password</label>

							<input
								type="password"
								placeholder="Confirm password"
								value={inputs.confirmPassword}
								onChange={(e) =>
									setInputs({
										...inputs,
										confirmPassword:
											e.target.value,
									})
								}
							/>
						</div>

					</div>

					<GenderCheckbox
						onCheckboxChange={handleCheckboxChange}
						selectedGender={inputs.gender}
					/>

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
						<span>Already have an account?</span>

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