/* eslint-disable react-hooks/exhaustive-deps */
// import from module
// import from local
import { LoggedUser, Search, UserList } from "../../../Components/index";
import { Buttons } from "../../../Components/UserList/UserList";
import Chat from "../../Chat/Chat";
import "./Desktop.scss";

const Desktop = ({
	conversation,
	handleCoversation,
	setConversation,
	currentChat,
	setCurrentChat,
	setMessage,
	message,
	allUser,
	isFriendList,
	setIsFriendList,
}) => {
	return (
		<div className="desktop">
			<div className="leftside">
				<LoggedUser />
				<Search />
				<Buttons
					setIsFriendList={setIsFriendList}
					isFriendList={isFriendList}
				/>
				<div style={{ height: "81%", overflow: "auto" }}>
					<UserList
						handleCoversation={handleCoversation}
						conversation={conversation}
						allUser={allUser}
						setConversation={setConversation}
						currenChat={currentChat}
						setCurrentChat={setCurrentChat}
						isFriendList={isFriendList}
						setMessage={setMessage}
					/>
				</div>
			</div>

			{/* ************** right side************/}

			<Chat
				currentChat={currentChat}
				setMessage={setMessage}
				message={message}
				device={"desktop"}
			/>
		</div>
	);
};

export default Desktop;
