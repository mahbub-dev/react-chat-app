import { useEffect, useState } from "react";
import User from "./User";

const ChatList = ({
	conversation,
	handleConversation,
	handleDelConversation,
	currentChat,
	allUser,
}) => {
	const [chatUser, setChatUser] = useState([]);
	useEffect(() => {
		const chatList = [];
		conversation?.forEach((c) => {
			const id = c?.member?.find(
				(item) => item !== localStorage.getItem("userId")
			);
			for (let i = 0; i < allUser?.length; i++) {
				const element = allUser[i];
				if (element._id === id) {
					chatList.push({ user: element, convId: c._id });
				}
			}
		});
		setChatUser(chatList);
	}, [allUser, conversation]);
	return (
		<>
			{chatUser && chatUser.length ? (
				chatUser.map((item, index) => {
					return (
						<div
							className="item"
							key={index}
							style={{
								backgroundColor:
									currentChat?.convId === item.convId
										? "rgb(84 63 63 / 50%)"
										: "initial",
							}}
						>
							<User
								convItem={item}
								handleConversation={handleConversation}
								handleDelConversation={handleDelConversation}
							/>
						</div>
					);
				})
			) : (
				<p>List is empty</p>
			)}
		</>
	);
};

export default ChatList;
