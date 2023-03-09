/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../../socketContext";
import GroupsOfSms from "../Message/GroupsOfSms";
import Message from "../Message/Message";
import "./chatview.scss";

const ChatView = ({ device, messages, currentChat, }) => {
	const location = useLocation().pathname.split("/")[1];

	// const { socket } = useSocket();
	// const [updateUnseen, setUpdateUnseen] = useState([]);
	// const [prevUseen, setPrevUnseen] = useState(0);
	// const [totalUnseen, setTotalUnseen] = useState(0);
	// const [resetUnseen, setResetUnseen] = useState(false);

	useEffect(() => {
		const divEl = document.querySelector(`#${device}ChatView`);
		divEl.scrollBy(0, divEl.scrollHeight);
	}, [messages, device]);
	// useEffect(() => {
	// 	socket.on("getSeen", (res) => {
	// 		console.log(res);
	// 		if (res.totalUnseen === 0) {
	// 			setResetUnseen(true);
	// 			setPrevUnseen(0);
	// 		} else {
	// 			setUpdateUnseen((p) => [
	// 				...p,
	// 				Date.now().toString().slice(0, 10),
	// 			]);
	// 		}
	// 	});
	// }, [socket]);

	// useEffect(() => {
	// 	let count = conversation?.find((i) => i._id === currentChat?.convId);

	// 	setPrevUnseen(count?.totalUnseen);
	// 	let total = updateUnseen?.filter(
	// 		(i, ind, arr) => arr.indexOf(i) === ind
	// 	);
	// 	if (resetUnseen) {
	// 		setTotalUnseen(total.length);
	// 	} else {
	// 		if (count) {
	// 			setTotalUnseen(total.length + count?.totalUnseen);
	// 		}
	// 		console.log(total.length);
	// 	}
	// }, [conversation, currentChat, socket, updateUnseen]);
	// useEffect(() => {
	// 	if (currentChat?.convUser?.isOnlne === undefined) {
	// 		setTotalUnseen(prevUseen + 1);
	// 	}
	// }, [messages]);

	// let prevDuplicatMessage = messages?.filter(
	// 	(item, index, arr) => arr.indexOf(item) === index
	// );

	// let unseenSmsIndex = 0;
	// prevDuplicatMessage.length &&
	// 	(unseenSmsIndex = prevDuplicatMessage.length - totalUnseen);
	const groupedMessages = {};

	messages.forEach(message => {
		const date = new Date(message.createdAt).toDateString();
		if (groupedMessages[date]) {
			groupedMessages[date].push(message);
		} else {
			groupedMessages[date] = [message];
		}
	});
	return (
		<div
			id={device === "mobile" ? "mobileChatView" : "desktopChatView"}
			className="chatView"
		>
			<div className="particiapants">
				<img width={'40px'} src={currentChat[0]?.profilePicture} alt="" />
				<h5>{currentChat[0]?.username}</h5>
			</div>
			{location !== "home" ? (
				<p>Please select a user</p>
			) : messages.length ? (
				messages?.length > 0 ? (
					Object.keys(groupedMessages)?.map((m, i, arr) => {
						return (
							<div key={m} >
								<GroupsOfSms
									messages={groupedMessages[m]}
									index={i}
									array={arr}

								/>
							</div>
						);
					})
				) : (
					"loading ..."
				)
			) : (
				<p>Say Assalamualaikum to start chat </p>
			)}
		</div>
	);
};

export default ChatView;
