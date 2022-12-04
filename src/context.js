import { useState, useEffect, useContext, createContext } from "react";
import ApiRequest from "./Api Request/apiRequest";

const AppContext = createContext();
const AppProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState("");
	const [userList, setUserList] = useState("");
	const [convId, setConvId] = useState("");
	const [currentChat, setCurrentChat] = useState({});
	const [message, setMessage] = useState([]);

	// handle Modals
	const [user, setUser] = useState("");
	const [showImage, setShowImage] = useState();
	const OpenUserDetails = (data, handleModals) => {
		setUser(data);
		handleModals(true, "user-details");
	};
	const OpenUploadImage = (data, handleModals) => {
		setShowImage(data);
		handleModals(true, "imageShow");
	};
	const handleModals = (isOpen, className) => {
		const openUser = document.querySelector(`.${className}`);
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
				OpenUserDetails,
				OpenUploadImage,
				showImage,

				convId,
				setConvId,
				//for login user
				loggedUser,
				setLoggedUser,

				userList,
				setUserList,

				currentChat,
				setCurrentChat,
				message,
				setMessage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
export default AppProvider;
export const useGlobalContext = () => useContext(AppContext);
