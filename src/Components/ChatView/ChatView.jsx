import React, { useEffect } from "react";
import "./chatview.scss";
import Message from "../Message/Message";
import { useGlobalContext } from "../../context";
import { useLocation } from "react-router-dom";

const ChatView = () => {
	const location = useLocation().pathname.split("/")[2];
	const { message, currentChat } = useGlobalContext();
	useEffect(() => {
		const divEl = document.querySelector(".chatView");
		divEl.scrollBy(0, divEl.scrollHeight);
	}, [message.length]);
	return (
		<div className="chatView">
			{localStorage.getItem("friendId") && message === "not found" ? (
				<p>Send a salam to start chat </p>
			) : location !== localStorage.getItem("userId") ? (
				message?.length > 0 ? (
					message
						?.filter(
							(item, index, arr) => arr.indexOf(item) === index
						)
						?.map((m, i, arr) => {
							return (
								<div key={i}>
									<Message
										messages={m}
										profilePicture={
											currentChat?.profilePicture
										}
										own={
											m.sender ===
											localStorage.getItem("userId")
												? true
												: false
										}
									/>
								</div>
							);
						})
				) : (
					"loading ..."
				)
			) : (
				<p>Please select a user</p>
			)}
		</div>
	);
};

export default ChatView;
