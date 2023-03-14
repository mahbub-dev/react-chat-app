/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { getUser } from "../../../Api Request/userRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import Loading from "../../Loading/Loading";
import Search from "../Search/Search";
import { getLastSeenMessag } from '../../../Utils/functions'
import User from "./User/User";
import {updateSeenStatus } from "../../../Api Request/conversationRequest";

const ChatList = ({ handleConversation }) => {
	const { socket, sendSeenStatusToSocketServer } = useSocket()
	const [chats, setChats] = useState([]);
	const [responseStatus, setResponseStatus] = useState(200);
	const [detectCurrentChat, setDetectCurrentChat] = useState(localStorage.getItem('convId'));
	const { searchValue, setConversation: setMessages, setChatList, chatList, setLastSeen } = useGlobalContext();
	const userId = localStorage.getItem("userId");
	const convRef = useRef(chats)

	useEffect(() => {
		const getConv = async () => {
			try {
				const res = await ApiRequest.get(`/conversation/?search=${searchValue}`);
				// console.log(res.data)
				convRef.current = res.data
				setChatList(convRef.current)
				setResponseStatus(res.status)
			} catch (error) {
				setResponseStatus(error?.response.status)
				console.log(error.response?.data);
			}
		};
		getConv()
	}, [searchValue]);

	// receive message by socket and send seen status 
	useEffect(() => {
		socket?.on("getMessage", (data) => {
			// console.log(data)
			const updateConv = [...convRef.current]
			let addLastestMessage = updateConv?.find(i => i._id === data.senderId);
			addLastestMessage.lastSms = data.message[data.message.length - 1]

			if (localStorage.getItem('receiverId') === data.senderId) {
				data.message[data.message.length - 1]?.seenBy.push(userId)
				setMessages(p => ({ ...p, message: data.message }))
				getLastSeenMessag(data.message)
				setLastSeen(getLastSeenMessag(data.message))
				updateSeenStatus(localStorage.getItem('convId'), (res) => {
					if (res.status === 200) {
						sendSeenStatusToSocketServer(data.message)
					}
				})
			} else {
				console.log(data.senderId)
				// addLastestMessage.lastSms.isSeen = true
				// setUnreadMessage((p) => [...p, data]);
				// sendSeenStatus(false);
				// soundRef.current === "yes" && playSound();
			}
			setChatList(p => updateConv)
		});


		// get Seen Status
		socket.on('getSeen', (d) => {
			setLastSeen(getLastSeenMessag(d.message))
		})
	}, [socket, setMessages]);
	return (
		<>
			<Search />
			{responseStatus === 200 ? (
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
								style={{ background: (detectCurrentChat === item.convId) ? '#F5F5F5' : 'initial' }}
							>
								<User
									item={item}
									itemArray={arr}
								/>
							</div>
						);
					})
			) : responseStatus !== 404 ? (
				<Loading />
			) : (
				"No data Found"
			)}
		</>
	);
};

export default ChatList;
