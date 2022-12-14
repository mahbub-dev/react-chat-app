import { useEffect, useState } from "react";
import { ChatHeader, ChatView, MessageInput } from "../../Components";
import "./Chat.scss";

function Chat({ currentChat, message, setMessage, device,conversation }) {
	const [currentChatUser, setCurrentChatUser] = useState({});
	const [isOnline, setIsOnline] = useState("");
	useEffect(() => {
		setCurrentChatUser(currentChat?.convUser);
		setIsOnline(currentChat?.isOnline);
	}, [currentChat]);

	// get message from server
	return (
		<div className="rightside">
			<ChatHeader currentChatUser={currentChatUser} isOnline={isOnline} />
			{/* message view area  */}
			<ChatView
				messages={message}
				device={device}
				conversation={conversation}
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
