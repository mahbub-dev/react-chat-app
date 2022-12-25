/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
import { deleteConversation } from "../../Api Request/conversationRequest";
import { getMessage } from "../../Api Request/messageRequest";
import { getUser } from "../../Api Request/userRequest";
import { LoggedUser, UserList } from "../../Components";
import Buttons from "../../Components/LeftSideComp/UserList/Buttons";
import { useGlobalContext } from "../../context";
import SocketProvider from "../../socketContext";
import Chat from "../Chat/Chat";
import "./home.scss";
function Home() {
	const userId = localStorage.getItem("userId");
	const location = useLocation().pathname.split("/")[1];
	const navigate = useNavigate();
	const { unreadMessage, setUnreadMessage, searchValue } = useGlobalContext();
	const filteUnreadMessage = unreadMessage?.filter(
		(item, index, arr) => arr.indexOf(item) === index
	);
	const [conversation, setConversation] = useState([]);
	const [allUser, setAllUser] = useState([]);
	const [message, setMessage] = useState([]);
	const [currentChat, setCurrentChat] = useState({});
	const [userComp, setUserComp] = useState("");

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
			const { data } = await ApiRequest(`user/${location}`);
			localStorage.getItem("convId") &&
				location &&
				setCurrentChat({
					convId: localStorage.getItem("convId"),
					convUser: data,
				});
		};
		location !== "home" && getCurrentUser();
	}, []);

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
		const isConfirm = confirm("are you sure?");
		if (isConfirm) {
			if (id === currentChat.convId) {
				setMessage([]);
			}
			deleteConversation(id, (res) => {});
		}
	};

	const handleConversation = (convItem) => {
		const seenMessage = filteUnreadMessage?.filter(
			(i) => i.sender !== convItem?.user?._id
		);
		setUnreadMessage(seenMessage);
		setCurrentChat({
			convId: convItem?.convId,
			convUser: convItem?.user,
		});
		getMessage(convItem.convId, (res) => {
			res?.data ? setMessage(res.data) : setMessage([]);
		});
		localStorage.setItem("convId", convItem._id);
		navigate(`/${convItem?.user?._id}`);
	};
	return (
		<div className="home" id="home">
			<SocketProvider>
				<div className="leftside">
					<h1 style={{ textAlign: "left", fontSize: "25px" }}>
						Chats
					</h1>

					<Buttons
						conversation={conversation}
						allUser={allUser}
						setConversation={setConversation}
						setUserComp={setUserComp}
					/>

					<div style={{ height: "81%", overflow: "auto" }}>
						<UserList
							allUser={allUser}
							userComp={userComp}
							handleConversation={handleConversation}
							conversation={conversation}
							currentChat={currentChat}
							handleDelConversation={handleDelConversation}
						/>
					</div>
					<LoggedUser />
				</div>
				{/* ************** right side ************/}
				<Chat
					currentChat={currentChat}
					setMessage={setMessage}
					message={message}
					device={"desktop"}
				/>
			</SocketProvider>
		</div>
	);
}

export default Home;
