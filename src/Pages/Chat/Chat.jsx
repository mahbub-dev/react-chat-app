import { useLocation } from "react-router-dom";
import { ChatHeader, ChatView, MessageInput } from "../../Components";
import { useGlobalContext } from "../../context";
import "./Chat.scss";

function Chat({ isMessageNotFound, getMessage }) {
	const { conversation, setConversation } = useGlobalContext()
	const location = useLocation().pathname.includes('not_found')
	return (
		<div className="rightside">
			{
				!location ? <>
					<ChatHeader currentChatUser={conversation} />
					{/* message view area  */}
					<ChatView
						messages={conversation.message || []}
						currentChat={conversation?.participants || []}
						isMessageNotFound={isMessageNotFound}
						getMessage={getMessage}
					/>
					{/* message input  */}
					<form className="inputField" encType="multipart/form-data" onSubmit={(e) => { e.preventDefault() }}>
						<MessageInput
							messages={conversation}
							setMessages={setConversation}
						/>
					</form>
				</> : <p style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>Select a chat or start a new conversation</p>
			}

		</div>
	);
}

export default Chat;
