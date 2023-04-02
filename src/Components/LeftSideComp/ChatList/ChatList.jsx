﻿/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import Loading from "../../Loading/Loading";
import Search from "../Search/Search";
import { getLastSeenMessag, showNotification, playSound } from '../../../Utils/functions'
import User from "./User/User";
import { updateSeenStatus } from "../../../Api Request/conversationRequest";

const ChatList = ({ handleConversation }) => {
	const { socket, sendSeenStatusToSocketServer } = useSocket()
	// const [chats, setChats] = useState([]);
	const [responseStatus, setResponseStatus] = useState(200);
	const [detectCurrentChat, setDetectCurrentChat] = useState(localStorage.getItem('convId'));
	const [isMessageCome, setIsMessageCome] = useState()
	const { searchValue, setConversation: setMessages, conversation, setChatList, chatList, setLastSeen, notificationStatus, soundStatus, setUnreadMessage, unreadMessage } = useGlobalContext();
	const userId = localStorage.getItem("userId");
	const convRef = useRef()
	const soundRef = useRef()
	const notificationRef = useRef()
	useEffect(() => {
		const getConv = async () => {
			try {
				const res = await ApiRequest.get(`/conversation/?search=${searchValue}`);
				convRef.current = res.data
				setChatList(res.data)
				setResponseStatus(res.status)
			} catch (error) {
				setResponseStatus(error?.response.status)
				setChatList([])
			}
		};
		getConv()
	}, [searchValue]);

	// receive message by socket and send seen status 

	useEffect(() => {
		socket?.on("getMessage", (data) => {
			if (!data.isDeleted) {
				soundRef.current = true
			}

			const updateConv = [...convRef.current]
			let addLastestMessage = updateConv.find(i => i._id === data.senderId);
			addLastestMessage.lastSms = data.message[data.message.length - 1]
			if (localStorage.getItem('receiverId') === data.senderId) {
				// console.log(data)
				data.message[data.message.length - 1]?.seenBy.push(userId)
				setMessages(p => ({ ...p, message: data.message }))
				setLastSeen(getLastSeenMessag(data.message))
				sendSeenStatusToSocketServer(data.message)
				updateSeenStatus(localStorage.getItem('convId'), (res) => { })

			} else {
				if (!data.isDeleted) {
					setUnreadMessage(data)
					notificationRef.current = true
				}
			}
			setChatList(updateConv)
		});

		// get Seen Status
		socket.on('getSeen', (d) => {
			setLastSeen(getLastSeenMessag(d.message))
		})

	}, [socket]);


	useEffect(() => {

		if (notificationStatus === 'on') {
			notificationRef.current &&
				showNotification(unreadMessage)
			notificationRef.current = false
		}
	}, [unreadMessage]);

	useEffect(() => {
		if (soundStatus === "on") {
			soundRef.current &&
				playSound();
			soundRef.current = false

		}
	}, [conversation])
	return (
		<>
			<Search />

			{chatList.length > 0 ? (
				chatList
					.sort(
						(a, b) =>
							new Date(b?.lastSms?.createdAt).getTime() -
							new Date(a.lastSms?.createdAt).getTime()
					)
					.map((item, index, arr) => {
						return (
							<div
								onClick={() => { handleConversation(item); setDetectCurrentChat(item.convId) }}
								className="item"
								key={index}
								style={{ background: (detectCurrentChat === item.convId) ? '#F5F5F5' : 'initial', borderRadius: '10px' }}
							>
								<User
									item={item}
									itemArray={arr}
								/>
							</div>
						);
					})
			) : (
				responseStatus === 404 ? 'not found' : <Loading />
			)}
		</>
	);
};

export default ChatList;
