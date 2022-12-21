import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatHeader, ChatView, MessageInput } from "../../Components";
import "./Chat.scss";

function Chat({ currentChat, message, setMessage, device }) {
	const location = useLocation().pathname.split("/")[1];
	const [currentChatUser, setCurrentChatUser] = useState({});
	useEffect(() => {
		setCurrentChatUser(currentChat?.convUser);
	}, [currentChat]);
	console.log(currentChat)
	// get message from server
	return (
		<div
			className="rightside"
			style={location !== "home" ? { display: "flex" } : {}}
		>
			<ChatHeader
				currentChatUser={currentChatUser}
				setCurrenChatUser={setCurrentChatUser}
			/>
			{/* message view area  */}
			<ChatView
				messages={message}
				device={device}
				currentChat={currentChat}
			/>
			{/* message input  */}
			<div className="inputField">
				<MessageInput
					currentChat={currentChat}
					messages={message}
					setMessages={setMessage}
				/>
			</div>
		</div>
	);
}

export default Chat;
