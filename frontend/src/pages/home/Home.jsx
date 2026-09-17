import "../../style/Home.css";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className="app-shell">
			<main className="chat-window">
				<Sidebar />
				<MessageContainer />
			</main>
		</div>
	);
};

export default Home;