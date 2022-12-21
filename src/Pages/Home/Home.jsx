/* eslint-disable no-loop-func */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
import { getMessage } from "../../Api Request/messageRequest";
import { getUser } from "../../Api Request/userRequest";
import SocketProvider from "../../socketContext";
import Desktop from "./Desktop/Desktop";
import "./home.scss";
import Mobile from "./Mobile/Mobile";
function Home() {
	const userId = localStorage.getItem("userId");
	const location = useLocation().pathname.split("/")[1];
	const navigate = useNavigate();
	const [conversation, setConversation] = useState([]);
	const [allUserId, setAllUserId] = useState([]);
	const [message, setMessage] = useState([]);
	const [currentChat, setCurrentChat] = useState({});
	const [isFriendList, setIsFriendList] = useState(true);
	useEffect(() => {
		const getConversation = async () => {
			try {
				const { data } = await ApiRequest.get(
					`/conversation/${userId}`
				);
				setCurrentChat(data?.find((i) => i.member.includes(location)));
				if (data.length === 0) {
					setConversation(["empty"]);
				} else {
					setConversation(data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getConversation();
	}, [userId]);

	// get message
	useEffect(() => {
		getMessage(currentChat?.convId, (res) => {
			setMessage(res);
		});
	}, [currentChat]);

	// get all user from server
	useEffect(() => {
		getUser('search=" "', (res) => {
			let id = [];
			res.filter((i) => i._id !== userId).forEach((i) => {
				id.push(i._id);
			});
			setAllUserId(id);
		});
	}, [userId]);

	const handleCoversation = (device, convItem, user) => {
		setCurrentChat({ convId: convItem._id, convUser: user });
		navigate(`/${user?._id}`);
		if (device === "mobile") {
			const elem = document.querySelector(".mobile");
			const elem2 = document.querySelector(".rightside");
			elem.style.display = "none";
			elem2.style.display = "flex";
		}

		// if (!readMessage.isSeen && readMessage.id === data?._id) {
		// 	setReadMessage((p) => ({ ...p, isSeen: true }));
		// }
	};
	return (
		<div className="home" id="home">
			<SocketProvider>
				<Mobile
					conversation={conversation}
					handleCoversation={handleCoversation}
					currentChat={currentChat}
					setCurrentChat={setCurrentChat}
					message={message}
					setMessage={setMessage}
					setConversation={setConversation}
					allUser={allUserId}
					isFriendList={isFriendList}
					setIsFriendList={setIsFriendList}
				/>
				<Desktop
					currentChat={currentChat}
					setCurrentChat={setCurrentChat}
					setMessage={setMessage}
					conversation={conversation}
					handleCoversation={handleCoversation}
					message={message}
					allUser={allUserId}
					setConversation={setConversation}
					isFriendList={isFriendList}
					setIsFriendList={setIsFriendList}
				/>
			</SocketProvider>
		</div>
	);
}

export default Home;
