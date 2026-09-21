import "../../style/LogoutButton.css";

import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";

import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
const { loading, logout } = useLogout();

const handleLogout = () => {
toast(
(t) => (
	<div className="logout-confirm-toast">
		<p>Would you like to sign out of your account?</p>

		<div className="logout-confirm-actions">
			<button
				type="button"
				className="confirm-logout-btn"
				onClick={() => {
					toast.dismiss(t.id);
					logout();
				}}
			>
				Logout
			</button>

			<button
				type="button"
				className="cancel-logout-btn"
				onClick={() => toast.dismiss(t.id)}
			>
				Cancel
			</button>
		</div>
	</div>
),
{
	duration: 5000,
}
);
};

return (
<div className="logout-container">
{loading ? (
	<div className="logout-spinner"></div>
) : (
	<button
		type="button"
		className="logout-button"
		onClick={handleLogout}
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