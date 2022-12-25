import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import "./chatheader.scss";
const ChatHeader = ({ currentChatUser }) => {
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
				{location !== "home" ? (
					Object.keys(currentChatUser).length > 0 ? (
						<div
							className="opened-user"
							onClick={() =>
								OpenUserDetails(currentChatUser, handleModals)
							}
						>
							<div className="img">
								{currentChatUser?.profilePicture && (
									<img
										src={currentChatUser?.profilePicture}
										alt="user"
									/>
								)}
							</div>
							<div className="name">
								<h5>{currentChatUser?.username}</h5>
								{/* <p>{active} </p> */}
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
			<hr />
		</div>
	);
};

export default ChatHeader;
