import { useEffect, useState } from "react";
import { ChatHeader, ChatView, MessageInput } from "../../Components";
import { useGlobalContext } from "../../context";
import "./Chat.scss";

function Chat({ device }) {
	const [currentChatUser, setCurrentChatUser] = useState({});
	const [chat, setChat] = useState([])
	const [isOnline, setIsOnline] = useState("");
	const { conversation, setConversation } = useGlobalContext()
	// useEffect(() => {
	// 	setCurrentChatUser(currentChat?.convUser);
	// 	setIsOnline(currentChat?.isOnline);
	// }, [currentChat]);
	// get message from server
	return (
		<div className="rightside">
			<ChatHeader currentChatUser={conversation} />
			{/* message view area  */}
			<ChatView
				messages={conversation.message || []}
				currentChat={conversation?.participants || []}
				device={device}
			/>
			{/* message input  */}
			<div className="inputField">
				<MessageInput
					messages={conversation}
					setMessages={setConversation}
				/>
			</div>
		</div>
	);
}

export default Chat;
