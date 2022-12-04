import { useState, useEffect } from "react";
import { MessageInput, ChatView, ChatHeader } from "../../Components";
import "./Chat.scss";
import { useGlobalContext } from "../../context";
import { getMessage } from "../../Api Request/messageRequest";
import { getUser } from "../../Api Request/userRequest";
import { useLocation } from "react-router-dom";
import { createConversation } from "../../Api Request/conversationRequest";

function Chat() {
	const {
		currentChat,
		setMessage,
		convId,
		setConvId,
		setUserList,
		setCurrentChat,
	} = useGlobalContext();
	const location = useLocation().pathname.split("/")[2];
	useEffect(() => {
		getUser("", (data) => {
			let current = data?.find((i) => i._id === location);
			setUserList(data);
			setCurrentChat(current);
		});
	}, []);
	useEffect(() => {
		getMessage(convId, (res) => {
			setMessage(res);
		});
	}, [convId, setMessage]);
	useEffect(() => {
		createConversation(location, (res) => {
			setConvId(res._id);
		});
	}, [location, setConvId]);

	return (
		<div className="rightside">
			<ChatHeader />

			{/* message view area  */}
			<ChatView />

			{/* message input  */}
			<div className="inputField">
				<MessageInput
					currentChat={currentChat}
					setMessage={setMessage}
				/>
			</div>
		</div>
	);
}

export default Chat;
