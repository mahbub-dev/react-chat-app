import React, { useEffect } from "react";
import "./chatview.scss";
import Message from "../Message/Message";
import { useGlobalContext } from "../../context";

const ChatView = () => {
	const { message, currentChat } = useGlobalContext();
	useEffect(() => {
		const divEl = document.querySelector(".chatView");
		divEl.scrollBy(0, divEl.scrollHeight);
	}, [message.length]);
	return (
		<div className="chatView">
			{localStorage.getItem("friendId") && message === "not found" ? (
				<p>Send a salam to start chat </p>
			) : message?.length > 0 ? (
				message
					?.filter((item, index, arr) => arr.indexOf(item) === index)
					?.map((m, i, arr) => {
						return (
							<div key={i}>
								<Message
									messages={m}
									profilePicture={currentChat?.profilePicture}
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
			)}
		</div>
	);
};

export default ChatView;
