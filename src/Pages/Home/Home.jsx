/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
import {
	deleteConversation,
	updateConversation,
} from "../../Api Request/conversationRequest";
import { getMessage } from "../../Api Request/messageRequest";
import { getUser } from "../../Api Request/userRequest";
import { UserList } from "../../Components";
import Buttons from "../../Components/LeftSideComp/UserList/Buttons";
import { useGlobalContext } from "../../context";
import { useSocket } from "../../socketContext";
import { responSive } from "../../Utils/functions";
import Chat from "../Chat/Chat";
import "./home.scss";
function Home() {
	const { socket } = useSocket();
	const userId = localStorage.getItem("userId");
	const location = useLocation().pathname.split("/")[1];
	const navigate = useNavigate();
	const { searchValue } = useGlobalContext();
	const [conversation, setConversation] = useState([]);
	const [allUser, setAllUser] = useState([]);
	const [message, setMessage] = useState([]);
	const [currentChat, setCurrentChat] = useState({});
	const [userComp, setUserComp] = useState("");
	const [windowWidth, setWindowWidth] = useState(500);
	window.addEventListener("resize", (e) => {
		setWindowWidth(e.target.innerWidth);
	});

	useEffect(() => {
		const getConversation = async () => {
			try {
				const res = await ApiRequest.get(`/conversation/${userId}`);
				if (res.data) {
					setConversation(res.data);
				} else {
					setConversation(["empty"]);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getConversation();
	}, [userId]);

	// get currentChatUser on reload
	useEffect(() => {
		const getCurrentUser = async () => {
			const { data } = await ApiRequest.get(`user/${location}`);
			conversation?.forEach((c) => {
				const id = c?.member?.find(
					(item) => item !== localStorage.getItem("userId")
				);
				if (data._id === id) {
					data.lastSms = c.lastSms;
					data.totalUnseen = c.totalUnseen;
					localStorage.getItem("convId") &&
						location &&
						setCurrentChat({ convUser: data, convId: c._id });
				}
			});
		};
		location !== "home" && getCurrentUser();
		setWindowWidth(window.innerWidth);
	}, [conversation]);

	// remove convId when page location is home
	useEffect(() => {
		location === "home" && localStorage.removeItem("convId");
	}, [location]);

	// get message
	useEffect(() => {
		getMessage(currentChat?.convId, (res) => {
			res?.data && setMessage(res.data);
		});
	}, [currentChat.convId]);
	// get all user from server
	useEffect(() => {
		getUser(`search=${searchValue}`, (res) => {
			setAllUser(res.filter((i) => i._id !== userId));
		});
	}, [searchValue]);

	const handleDelConversation = (id) => {
		const isConfirm = confirm("Are you sure?");
		if (isConfirm) {
			if (id === currentChat.convId) {
				setMessage([]);
			}
			deleteConversation(id, (res) => {});
		}
	};

	// handle conversation
	const handleConversation = (convItem) => {
		localStorage.setItem("convId", convItem.convId);
		setCurrentChat({
			convId: convItem?.convId,
			convUser: convItem?.user,
			isOnline: convItem?.isOnline,
		});
		// get messages from server
		getMessages(convItem.convId);
		// set seen status
		setSeenStatus(convItem);

		navigate(`/${convItem?.user?._id}`);
		windowWidth <= 500 && responSive("right");
	};

	const getMessages = (convId) => {
		getMessage(convId, (res) => {
			res?.data ? setMessage(res.data) : setMessage([]);
		});
	};

	// set seen status
	const setSeenStatus = (convItem) => {
		if (
			convItem?.user?.lastSms?.sender !== localStorage.getItem("userId")
		) {
			socket.emit("isSeen", {
				isOpended: false,
				conversationId: convItem.convId,
				sender: localStorage.getItem("userId"),
				receiverId: convItem?.user?.lastSms?.sender,
			});
			updateConversation({ convId: convItem.convId });
		}
	};
	return (
		<div className="home" id="home">
			<div className="leftside">
				<h1 style={{ textAlign: "left", fontSize: "25px" }}>Chats</h1>
				<Buttons
					conversation={conversation}
					allUser={allUser}
					setConversation={setConversation}
					setUserComp={setUserComp}
				/>
				<div style={{ height: "81%", overflow: "auto" }}>
					<UserList
						message={message}
						allUser={allUser}
						userComp={userComp}
						handleConversation={handleConversation}
						conversation={conversation}
						currentChat={currentChat}
						handleDelConversation={handleDelConversation}
					/>
				</div>
			</div>
			{/* ************** right side ************/}
			<Chat
				currentChat={currentChat}
				setMessage={setMessage}
				message={message}
				device={"desktop"}
				conversation={conversation}
			/>
		</div>
	);
}

export default Home;
