/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Message from "../Message/Message";
import "./chatview.scss";

const ChatView = ({ device, messages, currentChat }) => {
	const location = useLocation().pathname.split("/")[1];
	useEffect(() => {
		const divEl = document.querySelector(`#${device}ChatView`);
		divEl.scrollBy(0, divEl.scrollHeight);
	}, [messages, device]);
	return (
		<div
			id={device === "mobile" ? "mobileChatView" : "desktopChatView"}
			className="chatView"
		>
			{location === "home" ? (
				<p>Please select a user</p>
			) : messages.length ? (
				messages?.length > 0 ? (
					messages
						?.filter(
							(item, index, arr) => arr.indexOf(item) === index
						)
						?.map((m, i) => {
							return (
								<div key={i}>
									<Message
										m={m}
										user={currentChat?.convUser}
										own={
											m.sender ===
											localStorage.getItem("userId")
												? true
												: false
										}
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
