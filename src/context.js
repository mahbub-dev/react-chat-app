/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ApiRequest from "./Api Request/apiRequest";
import { handleModals } from "./Utils/functions";

const AppContext = createContext();
const AppProvider = ({ children }) => {
	const handleConversationRef = useRef();
	const [loggedUser, setLoggedUser] = useState("");
	const [conversation, setConversation] = useState([]);
	const [userList, setUserList] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [unreadMessage, setUnreadMessage] = useState([]);
	const [userComps, setUserComps] = useState("");
	const [newMessagCount, setNewMessageCount] = useState(0);
	const [replyRefSms, setReplyRefSms] = useState({});
	const [lastSeen, setLastSeen] = useState({});
	const [chatList, setChatList] = useState([]);
	const [participant, setParticipant] = useState({});
	const inputRef = useRef({});
	const [soundStatus, setSoundStatus] = useState(
		localStorage.getItem("sound")
	);
	const [notificationStatus, setNotificationStatus] = useState(
		localStorage.getItem("notification")
	);


	// handle Modals
	const [user, setUser] = useState("");
	const [showImage, setShowImage] = useState();
	const [email, setEmail] = useState("");

	const OpenUserDetails = (data) => {
		setUser(data);
		handleModals(true, "user-details");
	};
	const OpenUploadImage = (data) => {
		setShowImage(data);
		handleModals(true, "imageShow");
	};

	const OpenEmailUpdateForm = (data) => {
		setEmail(data);
		handleModals(true, "change-email");
	};

	// send mail for verifiaction

	useEffect(() => {
		const getLoginUser = async () => {
			const userId = localStorage.getItem("userId");
			if (userId) {
				const res = await ApiRequest.get(`/user/${userId}`);
				if (res.status === 200) {
					setLoggedUser(res.data);
					localStorage.setItem(
						"profilePicture",
						res.data.profilePicture
					);
				}
			}
		};
		getLoginUser();
	}, []);

	// send notification

	const memoValue = {
		user,
		OpenUserDetails,
		OpenUploadImage,
		OpenEmailUpdateForm,
		email,
		showImage,

		// for login user
		loggedUser,
		setLoggedUser,

		conversation,
		setConversation,
		chatList,
		setChatList,
		lastSeen,
		setLastSeen,
		userList,
		setUserList,
		searchValue,
		setSearchValue,
		replyRefSms,
		setReplyRefSms,

		unreadMessage,
		setUnreadMessage,
		userComps,
		setUserComps,
		newMessagCount,
		setNewMessageCount,
		setSoundStatus,
		soundStatus,
		notificationStatus,
		setNotificationStatus,
		inputRef,
		handleConversationRef,
		participant,
		setParticipant,
	};
	return (
		<AppContext.Provider value={memoValue}> {children}</AppContext.Provider>
	);
};
export default AppProvider;
export const useGlobalContext = () => useContext(AppContext);
