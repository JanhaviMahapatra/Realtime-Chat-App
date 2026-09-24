import "../../style/Home.css";

import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

import useConversation from "../../zustand/useConversation";

const Home = () => {
const {
selectedConversation,
} = useConversation();

return (
<div className="app-shell">
<main className="chat-window">

<div
className={`sidebar-wrapper ${
selectedConversation
? "mobile-chat-selected"
: ""
}`}
>
<Sidebar />
</div>

<div
className={`message-wrapper ${
!selectedConversation
? "mobile-no-chat"
: ""
}`}
>
<MessageContainer />
</div>

</main>
</div>
);
};

export default Home;