import { useState, useEffect, useContext, createContext } from "react";
import ApiRequest from "./Api Request/apiRequest";

const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState("");

	// handle Modals
	const [user, setUser] = useState("");
	const handleModals = (isOpen, user) => {
		setUser(user);
		const openUser = document.querySelector(".user-details");
		const app = document.querySelector("body");
		const modalView = document.querySelector(".modals-view");
		if (isOpen) {
			openUser.style.display = "block";
			app.style.overflowY = "hidden";
			modalView.style.display = "block";
		} else {
			openUser.style.display = "none";
			modalView.style.display = "none";
		}
	};

	useEffect(() => {
		const getLoginUser = async () => {
			const userId = localStorage.getItem("userId");
			if (userId) {
				const { data } = await ApiRequest.get(`user/?search=${userId}`);
				setLoggedUser(data);
			}
		};
		getLoginUser();
	}, []);
	return (
		<AppContext.Provider
			value={{
				user,
				handleModals,

				//for login user
				loggedUser,
				setLoggedUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
export default AppProvider;
export const useGlobalContext = () => useContext(AppContext);
