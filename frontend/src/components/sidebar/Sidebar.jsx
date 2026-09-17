import "../../style/Sidebar.css";

import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
	<aside className="sidebar">

		<div className="sidebar-top">

			<div className="sidebar-brand">
				<div className="brand-logo">
					C
				</div>

				<div className="brand-info">
					<h2>ChatApp</h2>
					<p>Stay Connected</p>
				</div>
			</div>

			<SearchInput />

		</div>

		<div className="sidebar-divider"></div>

		<div className="sidebar-conversations">
			<Conversations />
		</div>

		<LogoutButton />

	</aside>
);
};

export default Sidebar;