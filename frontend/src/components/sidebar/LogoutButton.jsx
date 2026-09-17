import "../../style/LogoutButton.css";

import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
	<div className="logout-container">
		{loading ? (
			<div className="logout-spinner"></div>
		) : (
			<button
				type="button"
				className="logout-button"
				onClick={logout}
				aria-label="Logout"
			>
				<BiLogOut />
				<span>Logout</span>
			</button>
		)}
	</div>
);
};

export default LogoutButton;