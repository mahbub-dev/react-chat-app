/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
import {
	deleteConversation,
	updateConversation,
} from "../../Api Request/conversationRequest";
import { ChatList, Peoples, Groups } from "../../Components";
// import { useGlobalContext } from "../../context";
import { useSocket } from "../../socketContext";
// import { responSive } from "../../Utils/functions";
import buttonData from "./navbuttonData";
import Chat from "../Chat/Chat";
import "./home.scss";
import { useGlobalContext } from "../../context";
function Home() {
	const { socket } = useSocket();
	const {
		setConversation } = useGlobalContext();
	const btnRef = useRef()
	const userId = localStorage.getItem("userId");
	const [currentConv, setCurrentConv] = useState('')
	const [windowWidth, setWindowWidth] = useState(500);
	window.addEventListener("resize", (e) => {
		setWindowWidth(e.target.innerWidth);
	});


	// get currentChatUser on reload
	// remove convId when page location is home
	// const handleDelConversation = (id) => {
	// 	const isConfirm = confirm("Are you sure?");
	// 	if (isConfirm) {
	// 		if (id === currentChat.convId) {
	// 			setMessage([]);
	// 		}
	// 		deleteConversation(id, (res) => { });
	// 	}
	// };

	// handle conversation
	const handleConversation = (convId, convType,) => {
		// console.log(convId, convType)
		getMessage(convId)
		localStorage.setItem("convId", convId);
		setCurrentConv(convId)
		// setCurrentChat({
		// 	convId: convItem?.convId,
		// 	convUser: convItem?.user,
		// 	isOnline: convItem?.isOnline,
		// });
		// // get messages from server

		// getMessages(convItem.convId);
		// // set seen status
		// setSeenStatus(convItem);
		// navigate(`/${convItem?.user?._id}`);
		// windowWidth <= 500 && responSive("right");
	};

	const getMessage = async (convId) => {
		try {
			const res = await ApiRequest.get(
				`/conversation/message/${convId}`
			);
			setConversation(res.data)
		} catch (error) {
			console.log(error.response?.data);
		}
	};
	// get message
	useEffect(() => {
		getMessage(localStorage.getItem('convId'))
	}, []);
	//detect current chat after reload
	useEffect(() => {
		setCurrentConv(localStorage.getItem('convId'))
	}, [])
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
	const [renderConponent, setRenderComponent] = useState(
		<ChatList handleConversation={handleConversation} />
	);
	const [title, setTitle] = useState('Chats')
	const handleButtonClick = (identifier) => {
		setTitle(identifier)
		localStorage.setItem('currentComp', identifier)
		switch (identifier) {
			case 'Chats':
				setRenderComponent(<ChatList handleConversation={handleConversation} />)
				break;
			case 'Active Friends':
				setRenderComponent('Active Friend')
				break;
			case 'Add Friends':
				setRenderComponent(<Peoples />)
				break;
			case 'Groups':
				setRenderComponent(<Groups />)
				break;
			case 'Settings':
				setRenderComponent('Settings')
				break;
			case 'Profile':
				setRenderComponent('Profile')
				break;
			case 'Expand':
				setRenderComponent('Expand')
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		const currentRender = localStorage.getItem('currentComp')
		handleButtonClick(currentRender)
	}, [currentConv])
	return (
		<div className="home" id="home">
			<div className="navButtons" ref={btnRef}>
				{
					buttonData.map((i, ind) => (
						<button
							key={ind}
							title={i.title}
							onClick={() => handleButtonClick(i.title)}
							style={{ background: title === i.title && ' rgb(243, 239, 239)' }}
						>
							<img
								src={i.icon}
								alt={i.title}
							/>
						</button>
					))
				}
			</div>

			<div className="leftside">
				<h1 style={{ textAlign: "left", fontSize: "25px" }}>{title}</h1>
				<div style={{ height: "81%", overflow: "auto" }}>
					{renderConponent}
				</div>
			</div>

			{/* ************** right side ************/}
			<Chat
				device={"desktop"}
			/>
		</div>
	);
}

export default Home;
