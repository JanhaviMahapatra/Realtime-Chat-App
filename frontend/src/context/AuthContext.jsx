import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const getStoredUser = () => {
		try {
			const user = localStorage.getItem("chat-user");
			return user ? JSON.parse(user) : null;
		} catch (error) {
			console.error("Error reading user from localStorage:", error);
			return null;
		}
	};

	const [authUser, setAuthUser] = useState(getStoredUser);

	return (
	<AuthContext.Provider value={{ authUser, setAuthUser }}>
		{children}
	</AuthContext.Provider>
);
};