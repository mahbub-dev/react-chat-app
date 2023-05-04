/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import ApiRequest from "../../Api Request/apiRequest";
import { getLastSeenMessag } from '../../Utils/functions'
import { updateSeenStatus } from "../../Api Request/conversationRequest";
import { useSocket, } from "../../socketContext";
import { responSive } from "../../Utils/functions";
import buttonData from "./navbuttonData";
import Chat from "../Chat/Chat";
import "./home.scss";
import { useGlobalContext } from "../../context";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Home() {
	const navigate = useNavigate()
	const convId = useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 1]
	const { sendSeenStatusToSocketServer } = useSocket();
	const {
		setConversation, setChatList, setLastSeen, loggedUser, setLoggedUser, inputRef, handleConversationRef } = useGlobalContext();
	const btnRef = useRef()
	const userId = localStorage.getItem("userId");
	const isMessageNotFound = useRef(false)
	const windowWidth = useRef()
	window.addEventListener("resize", (e) => {
		windowWidth.current = e.target.innerWidth
	});
	useEffect(() => {
		windowWidth.current = window.innerWidth
	}, [])

	handleConversationRef.current = (item) => {
		let { convId, _id: receiverId, convType, lastSms } = item
		setConversation(p => ({ ...p, message: [] }))
		navigate(`/t/${convId}`)
		getMessage(convId, 30)
		localStorage.setItem("convId", convId);
		localStorage.setItem('receiverId', receiverId)
		localStorage.setItem('convType', convType)
		// setCurrentConv(convId)
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
		// console.log(windowWidth)
		windowWidth.current < 501 && responSive('right')
		const { setText, setAttachment } = inputRef.current
		setText('')
		setAttachment([])
	};

	const getMessage = async (convId, page) => {
		try {
			const res = await ApiRequest.get(
				`/conversation/message/${convId}/?page=${page}`
			);
			let { message, ...rest } = res.data
			setConversation(res.data)

			setLastSeen(getLastSeenMessag(res.data.message))
			res.data.messageStatus === 404 && (isMessageNotFound.current = true)
		} catch (error) {
			console.log(error?.response)
			if (error.response.status === 500 || 400) {
				navigate(`/t/${localStorage.getItem('convId') || "not_found"}`)
			}
		}
	};
	// get message

	useEffect(() => {
		getMessage(convId, 30)
	}, [convId]);

	const [title, setTitle] = useState('Chats')
	useEffect(() => {
		if (windowWidth.current < 501) {
			localStorage.getItem('isChatBoxOpened') === 'true' && responSive('right')
		}
	}, [])

	return <>
		<div className="home" id="home">
			<div className="notificaion">
			</div>
			<div className="navButtons" ref={btnRef}>
				{
					buttonData.map((i, ind) => (
						<button
							key={ind}
							title={i.title}
							onClick={() => {
								if (i.title === 'Logout') {
									localStorage.clear();
									setLoggedUser('')
									navigate(i.path)
									return
								};
								navigate(`${i.path}/${convId}`); setTitle(i.title)
							}}
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
					<Outlet />
				</div>
			</div>

			{/* ************** right side ************/}

			<Chat isMessageNotFound={isMessageNotFound} getMessage={getMessage} />
		</div>
	</>
}





export default Home;
