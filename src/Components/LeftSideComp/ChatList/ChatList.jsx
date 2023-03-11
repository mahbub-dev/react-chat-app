/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { getUser } from "../../../Api Request/userRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import Loading from "../../Loading/Loading";
import Search from "../Search/Search";
import User from "./User/User";

const ChatList = ({ handleConversation }) => {
	const { socket, } = useSocket()
	const [chats, setChats] = useState([]);
	const [responseStatus, setResponseStatus] = useState(200);
	const [detectCurrentChat, setDetectCurrentChat] = useState(localStorage.getItem('convId'));
	const { unreadMessage, searchValue, setConversation: setMessages, setChatList, chatList } = useGlobalContext();
	const userId = localStorage.getItem("userId");
	const convRef = useRef(chats)
	const removeDuplicat = unreadMessage.filter(
		(i, ind, arr) => arr.indexOf(i) === ind
	);

	useEffect(() => {
		const getConv = async () => {
			try {
				const res = await ApiRequest.get(`/conversation/?search=${searchValue}`);
				// console.log(res.data)
				setChatList(res.data)
				convRef.current = res.data
				setResponseStatus(res.status)
			} catch (error) {
				setResponseStatus(error?.response.status)
				console.log(error.response?.data);
			}
		};
		getConv()
	}, [searchValue]);


	useEffect(() => {
		socket?.on("getMessage", (data) => {
			// console.log(data)
			// updateConversation({
			// 	convId: data?.conversationId,
			// 	lastSms: {
			// 		sender: data?.sender,
			// 		sms: data?.message?.text,
			// 		timestamps: data?.createdAt,
			// 	},
			// });

			// const sendSeenStatus = (status) => {
			// 	socket.emit("isSeen", {
			// 		conversationId: data.conversationId,
			// 		sender: localStorage.getItem("userId"),
			// 		isOpended: status,
			// 		receiverId: data.sender,
			// 	});
			// };

			const updateConv = [...convRef.current]
			let addLastestMessage = updateConv?.find(i => i._id === data.senderId);
			addLastestMessage.lastSms = data.message[data.message.length - 1]
			setChatList(p => updateConv)

			if (localStorage.getItem('receiverId') === data.senderId) {
				setMessages(p => ({ ...p, message: data.message }))
				console.log('seen')
				// updateConversation({ convId: data?.conversationId });
				// sendSeenStatus(true);
			} else {
				console.log(data.senderId)
				// setUnreadMessage((p) => [...p, data]);
				// sendSeenStatus(false);
				// soundRef.current === "yes" && playSound();
			}
		});

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
								onClick={() => { handleConversation(item.convId, item._id, item.convType); setDetectCurrentChat(item.convId) }}
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
