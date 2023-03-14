import { ChatHeader, ChatView, MessageInput } from "../../Components";
import { useGlobalContext } from "../../context";
import "./Chat.scss";

function Chat({ device }) {
	const { conversation, setConversation } = useGlobalContext()
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
