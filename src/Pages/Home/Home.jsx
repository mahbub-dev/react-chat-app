/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import ApiRequest from "../../Api Request/apiRequest";
import { getLastSeenMessag } from '../../Utils/functions'
import { updateSeenStatus } from "../../Api Request/conversationRequest";
import { ChatList, Peoples, Groups, Profile } from "../../Components";
import { useSocket, } from "../../socketContext";
// import { responSive } from "../../Utils/functions";
import buttonData from "./navbuttonData";
import Chat from "../Chat/Chat";
import "./home.scss";
import { useGlobalContext } from "../../context";
function Home() {

	const { sendSeenStatusToSocketServer } = useSocket();
	const {
		setConversation, setChatList, setLastSeen, loggedUser } = useGlobalContext();
	const btnRef = useRef()
	const userId = localStorage.getItem("userId");
	const [currentConv, setCurrentConv] = useState('')
	// const [windowWidth, setWindowWidth] = useState(500);
	window.addEventListener("resize", (e) => {
		// setWindowWidth(e.target.innerWidth);
	});

	const handleConversation = (item) => {
		let { convId, _id: receiverId, convType, lastSms } = item
		getMessage(convId)
		localStorage.setItem("convId", convId);
		localStorage.setItem('receiverId', receiverId)
		localStorage.setItem('convType', convType)
		setCurrentConv(convId)
		updateSeenStatus(convId, (res) => {
			!lastSms?.seenBy?.includes(userId) && lastSms?.seenBy?.push(userId)
			setChatList(p => {
				p[p.indexOf(item)] = item
				return p
			})
			if (res?.status === 200) {
				sendSeenStatusToSocketServer(res.data.message)
				setLastSeen(res.data.message[res.data.message.length - 1])
			}
		})
		// windowWidth <= 500 && responSive("right");
	};

	const getMessage = async (convId) => {
		try {
			const res = await ApiRequest.get(
				`/conversation/message/${convId}`
			);
			setConversation(res.data)
			setLastSeen(getLastSeenMessag(res.data.message))
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
	const [renderConponent, setRenderComponent] = useState(
		<ChatList handleConversation={handleConversation} />
	);
	const [title, setTitle] = useState('Chats')
	const handleButtonClick = (identifier) => {
		localStorage.setItem('currentComp', identifier)
		setTitle(identifier)
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
				setRenderComponent(<Profile />)
				break;
			case 'Logout':
				localStorage.clear()
				window.location.reload()
				break;
			default:
				break;
		}
	}
	useEffect(() => {
		const currentRender = localStorage.getItem('currentComp')
		if (currentRender === null) {
			handleButtonClick('Chats')
		} else handleButtonClick(currentRender)
	}, [])

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
								src={i?.icon ? i?.icon : loggedUser.profilePicture}
								alt={i.title}
							/>
						</button>
					))
				}
			</div>

			<div className="leftside">
				<h1 style={{ textAlign: "left", fontSize: "25px" }}>{title ? title : 'Chats'}</h1>
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
