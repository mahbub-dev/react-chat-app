import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, getUserById } from "../../../Api Request/userRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { responSive } from "../../../Utils/functions";
import "./chatheader.scss";
const ChatHeader = ({ currentChatUser, isOnline }) => {
	const [chatUser, setChatUser] = useState({})
	const navigate = useNavigate();
	const location = useLocation().pathname.split("/")[1];
	const { handleModals, OpenUserDetails } = useGlobalContext();
	const { onlineUsers } = useSocket();
	let active;
	onlineUsers?.forEach((i) =>
		i.userId.includes(currentChatUser?._id)
			? (active = "online")
			: (active = "ofline")
	);
	currentChatUser = { ...currentChatUser, status: active };

	return (
		<div className="header">
			<div className="wrapper">
				{!location !== "home" ? (
					currentChatUser?.participants?.length === 1 ? (
						<div
							className="opened-user"
							onClick={() =>
								OpenUserDetails(currentChatUser?.participants[0], handleModals)
							}
						>
							<div className="img">
								{currentChatUser?.participants[0]?.profilePicture && (
									<img
										src={currentChatUser?.participants[0]?.profilePicture}
										alt="user"
									/>
								)}
							</div>
							<div className="name">
								<h5>{currentChatUser?.participants[0]?.username}</h5>
								{isOnline && <p>online</p>}
							</div>
						</div>
					) : (
						<p
							className="not-selected"
							style={{ paddingLeft: "1rem" }}
						>
							Loading...
						</p>
					)
				) : (
					<p className="not-selected" style={{ paddingLeft: "1rem" }}>
						user not selected
					</p>
				)}
			</div>
			<BiLeftArrow
				className="back"
				onClick={() => {
					responSive("left");
					navigate("/home");
				}}
			/>
		</div>
	);
};

export default ChatHeader;
