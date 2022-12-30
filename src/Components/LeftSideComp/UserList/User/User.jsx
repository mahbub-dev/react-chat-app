import React from "react";
import { useSocket } from "../../../../socketContext";
import { UserLoader } from "../../../index";
import UserOption from "../../../Modals/UserOption/UserOption";
import "./user.scss";

function User({ convItem, handleConversation, handleDelConversation }) {
	const { onlineUsers } = useSocket();
	let isOnline;
	onlineUsers &&
		onlineUsers.forEach((i) => {
			i.userId === convItem?.user?._id && (isOnline = i?.userId);
		});
	convItem.isOnline = isOnline;
	let isSeen =
		convItem?.user?.lastSms?.sender !== localStorage.getItem("userId");

	return (
		<>
			{Object.keys(convItem).length > 0 ? (
				<>
					<div
						className="user"
						onClick={() => {
							handleConversation(convItem);
						}}
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
									fontWeight:
										isSeen && convItem.user.totalUnseen > 0
											? "bold"
											: "500",
								}}
							>
								{convItem?.user?.username}
							</h5>
							<p
								style={{
									fontWeight:
										isSeen && convItem.user.totalUnseen > 0
											? "bold"
											: "initial",
								}}
							>
								{convItem?.user?.lastSms?.sms
									? convItem?.user?.lastSms?.sms
									: "image"}
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
