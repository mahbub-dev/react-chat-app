/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../../socketContext";
import Message from "../Message/Message";
import "./chatview.scss";

const ChatView = ({ device, messages, currentChat, conversation }) => {
	const location = useLocation().pathname.split("/")[1];
	const { socket } = useSocket();
	const [updateUnseen, setUpdateUnseen] = useState([]);
	const [prevUseen, setPrevUnseen] = useState(0);
	const [totalUnseen, setTotalUnseen] = useState(0);
	const [resetUnseen, setResetUnseen] = useState(false);
	useEffect(() => {
		const divEl = document.querySelector(`#${device}ChatView`);
		divEl.scrollBy(0, divEl.scrollHeight);
	}, [messages, device]);
	useEffect(() => {
		socket.on("getSeen", (res) => {
			if (res.totalUnseen === 0) {
				setResetUnseen(true);
				setPrevUnseen(0);
			} else {
				setUpdateUnseen((p) => [
					...p,
					Date.now().toString().slice(0, 10),
				]);
			}
		});
	}, [socket]);

	useEffect(() => {
		let count = conversation?.find((i) => i._id === currentChat?.convId);
		setPrevUnseen(count?.totalUnseen);
		let total = updateUnseen?.filter(
			(i, ind, arr) => arr.indexOf(i) === ind
		);
		if (resetUnseen) {
			setTotalUnseen(total.length);
		} else {
			if (count) {
				setTotalUnseen(total.length + count?.totalUnseen);
			}
		}
	}, [conversation, currentChat, socket]);
	console.log(prevUseen);
	// useEffect(() => {
	// 	if (currentChat?.convUser?.isOnlne === undefined) {
	// 		setTotalUnseen(prevUseen + 1);
	// 	}
	// }, [messages]);

	let prevDuplicatMessage = messages?.filter(
		(item, index, arr) => arr.indexOf(item) === index
	);
	console.log(totalUnseen);
	let unseenSmsIndex = 0;
	prevDuplicatMessage.length &&
		(unseenSmsIndex = prevDuplicatMessage.length - totalUnseen);

	return (
		<div
			id={device === "mobile" ? "mobileChatView" : "desktopChatView"}
			className="chatView"
		>
			{location === "home" ? (
				<p>Please select a user</p>
			) : messages.length ? (
				messages?.length > 0 ? (
					prevDuplicatMessage?.map((m, i) => {
						return (
							<div key={i}>
								<Message
									m={m}
									i={i}
									unSeenIndex={
										(resetUnseen
											? prevDuplicatMessage?.length
											: unseenSmsIndex) - 1
									}
									user={currentChat?.convUser}
									own={
										m.sender ===
										localStorage.getItem("userId")
											? true
											: false
									}
									currentChat={currentChat}
									other={
										m.sender !==
										localStorage.getItem("userId")
									}
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
