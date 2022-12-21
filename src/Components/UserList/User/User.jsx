import React, { useEffect, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import Active from "../../Active/Active";
import UserOption from "../../Modals/UserOption/UserOption";
import UserLoader from "../../UserLoader/UserLoader";
import "./user.scss";

function User({ convItem, handleCoversation, handleDelConversation }) {
	const [user, setUser] = useState({});
	const { readMessage } = useGlobalContext();
	const { onlineUsers } = useSocket();
	useEffect(() => {
		const userId = convItem?.member?.find(
			(i) => i !== localStorage.getItem("userId")
		);
		const getFiriendUser = async () => {
			const res = await ApiRequest.get(`/user/${userId}`);
			setUser(res.data);
		};
		getFiriendUser();
	}, [convItem]);
	let isOnline;
	onlineUsers &&
		onlineUsers.forEach((i) => {
			isOnline = i.userId.includes(user?._id);
		});

	return (
		<>
			{Object.keys(user).length > 0 ? (
				<>
					<div
						className="user"
						onClick={() => handleCoversation("mobile", convItem ,user)}
					>
						<div className="img">
							<img src={user?.profilePicture} alt="img" />
							<Active isOnline={isOnline} id={user?._id} />
						</div>
						<div className="name">
							<h5>{user?.username}</h5>
							<p
								className="last-sms"
								style={{
									fontWeight: readMessage?.isSeen
										? "initial"
										: "bold",
								}}
							>
								{readMessage.id === user?._id &&
									readMessage?.lastMessage}
							</p>
						</div>
						<div className="time">
							<p>{user?.time}</p>
						</div>
					</div>
					<UserOption
						// conversation={conversation}
						user={user}
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
