/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context";
import { useSocket } from "../../../../socketContext";
import User from "./User";

const ChatList = ({
	conversation,
	handleConversation,
	handleDelConversation,
	currentChat,
	allUser,
	message,
}) => {
	const [chatUser, setChatUser] = useState([]);
	const { unreadMessage } = useGlobalContext();
	const { socket } = useSocket();
	const removeDuplicat = unreadMessage.filter(
		(i, ind, arr) => arr.indexOf(i) === ind
	);
	useEffect(() => {
		const chatList = [];
		conversation?.forEach((c, ind, arr) => {
			const id = c?.member?.find(
				(item) => item !== localStorage.getItem("userId")
			);

			for (let i = 0; i < allUser?.length; i++) {
				let element = allUser[i];
				let result;
				if (element._id === id) {
					element.lastSms = c.lastSms;
					element.totalUnseen = c.totalUnseen;
					result = {
						user: element,
						convId: c._id,
					};
					removeDuplicat?.forEach((s) => {
						if (s.sender === element._id) {
							const { user } = result;
							const { lastSms } = user;
							lastSms.timestamps = s?.createdAt;
							lastSms.sms = s?.message?.text;
							lastSms.sender = s?.sender;
							user.totalUnseen += 1;
						}
					});
					chatList.push(result);
				}
			}
		});

		setChatUser(chatList);
	}, [allUser, conversation, unreadMessage]);

	useEffect(() => {
		const chatList = [];
		conversation?.forEach((c, ind, arr) => {
			const id = c?.member?.find(
				(item) => item !== localStorage.getItem("userId")
			);
			for (let i = 0; i < allUser?.length; i++) {
				let element = allUser[i];
				let result;
				if (element._id === id) {
					element.totalUnseen = c.totalUnseen;
					element.lastSms = c.lastSms;
					result = {
						user: element,
						convId: c._id,
					};

					if (
						message &&
						message[message.length - 1]?.conversationId === c._id
					) {
						const targetSms =
							message && message[message.length - 1];
						const { user } = result;
						const { lastSms } = user;
						let time = new Date(targetSms?.createdAt);
						lastSms?.sender !== localStorage.getItem("userId") &&
							(user.totalUnseen = 0);
						lastSms.sms = targetSms?.message?.text;
						lastSms.timestamps = time.getTime();
					}
					chatList.push(result);
				}
			}
		});
		setChatUser(chatList);
	}, [message]);

	return (
		<>
			{chatUser && chatUser.length ? (
				chatUser
					.sort(
						(a, b) =>
							b?.user?.lastSms.timestamps -
							a?.user?.lastSms.timestamps
					)
					.map((item, index) => {
						return (
							<div
								className="item"
								key={index}
								style={{
									backgroundColor:
										currentChat?.convId === item.convId
											? "#F5F5F5"
											: "initial",
								}}
							>
								<User
									convItem={item}
									handleConversation={handleConversation}
									handleDelConversation={
										handleDelConversation
									}
									message={message}
								/>
							</div>
						);
					})
			) : (
				<p>List is empty</p>
			)}
		</>
	);
};

export default ChatList;
