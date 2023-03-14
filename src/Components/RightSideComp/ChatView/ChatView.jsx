/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import GroupsOfSms from "../Message/GroupsOfSms";
import "./chatview.scss";

const ChatView = ({ device, messages, currentChat, }) => {
	useEffect(() => {
		const divEl = document.querySelector(`#${device}ChatView`);
		divEl.scrollBy(0, divEl.scrollHeight);
	}, [messages, device]);

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
			{false ? (
				<p>Please select a user</p>
			) : messages.length ? (
				messages?.length > 0 ? (
					Object.keys(groupedMessages)?.map((m, i, arr) => {
						return (
							<div key={m} >
								<GroupsOfSms
									messages={groupedMessages[m]}
									index={i}
									currentChat={currentChat}
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
