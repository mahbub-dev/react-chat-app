import { ChatHeader, ChatView, MessageInput } from "../../Components";
import { useGlobalContext } from "../../context";
import "./Chat.scss";

function Chat({isMessageNotFound}) {
	const { conversation, setConversation } = useGlobalContext()
	return (
		<div className="rightside">
			<ChatHeader currentChatUser={conversation} />
			{/* message view area  */}
			<ChatView
				messages={conversation.message || []}
				currentChat={conversation?.participants || []}
				isMessageNotFound={isMessageNotFound}
			/>
			{/* message input  */}
			<form className="inputField" encType="multipart/form-data" onSubmit={(e) => { e.preventDefault() }}>
				<MessageInput
					messages={conversation}
					setMessages={setConversation}
				/>
			</form>
		</div>
	);
}

export default Chat;
