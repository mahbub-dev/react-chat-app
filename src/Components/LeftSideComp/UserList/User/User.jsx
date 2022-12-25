import React from "react";
import { useGlobalContext } from "../../../../context";
import { useSocket } from "../../../../socketContext";
import { UserLoader } from "../../../index";
import UserOption from "../../../Modals/UserOption/UserOption";
import "./user.scss";

function User({ convItem, handleConversation, handleDelConversation }) {
	const { unreadMessage } = useGlobalContext();
	const toReadSms = unreadMessage?.filter(
		(item, index, arr) => arr.indexOf(item) === index
	);

	const { onlineUsers } = useSocket();
	// console.log(searchValue);

	const mySms = toReadSms?.filter((i) => i?.sender === convItem?.user?._id);
	// console.log(user)
	let isOnline;
	onlineUsers &&
		onlineUsers.forEach((i) => {
			i.userId === convItem?.user?._id && (isOnline = i?.userId);
		});
	return (
		<>
			{Object.keys(convItem).length > 0 ? (
				<>
					<div
						className="user"
						onClick={() => handleConversation(convItem)}
					>
						<div className="img">
							<img
								src={convItem?.user?.profilePicture}
								alt="img"
							/>
							<div
								className={
									isOnline === convItem?.user?._id
										? "active"
										: ""
								}
							></div>
						</div>
						<div className="name">
							<h5
								style={{
									color:
										mySms?.length > 0 ? "black" : "white",
								}}
							>
								{convItem?.user?.username}
							</h5>
							<p
								style={{
									fontWeight:
										mySms?.length > 0 ? "bold" : "initial",
								}}
							>
								{/* {readMessage.id === user?._id &&
									readMessage?.lastMessage} */}
								{mySms && mySms.length > 0 && mySms.length}
							</p>
						</div>
						<div className="time">
							<p>{convItem?.user?.time}</p>
						</div>
					</div>
					<UserOption
						// conversation={conversation}
						convItem={convItem}
						handleDelConversation={handleDelConversation}
					/>
				</>
			) : (
				<UserLoader />
			)}
		</>
	);
}

export default User;
