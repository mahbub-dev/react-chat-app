import React from "react";
import ChatList from "./User/ChatList";
import "./userlist.scss";

const UserList = ({
	userComp,
	handleConversation,
	handleDelConversation,
	currentChat,
	allUser,
	message,
	conversation,
}) => {
	return (
		<div className="userlist">
			{userComp === "" ? (
				<ChatList
					handleConversation={handleConversation}
					currentChat={currentChat}
					conversation={conversation}
					allUser={allUser}
					message={message}
					handleDelConversation={handleDelConversation}
				/>
			) : (
				userComp
			)}
		</div>
	);
};

export default UserList;
