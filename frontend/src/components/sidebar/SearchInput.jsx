import "../../style/SearchInput.css";

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
	const [search, setSearch] = useState("");

	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!search.trim()) return;

		if (search.trim().length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("No such user found!");
		}
	};
  return (
	<form className="search-form" onSubmit={handleSubmit}>
		<div className="search-box">
			<IoSearchSharp className="search-icon" />

			<input
				type="text"
				className="search-input"
				placeholder="Search conversations..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			{search && (
				<button
					type="submit"
					className="search-submit"
				>
					Go
				</button>
			)}
		</div>
	</form>
);
	
};

export default SearchInput;