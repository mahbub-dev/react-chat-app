import { BiLeftArrow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { responSive } from "../../../Utils/functions";
import "./chatheader.scss";
const ChatHeader = ({ currentChatUser, isOnline }) => {
	const navigate = useNavigate();
	const location = useLocation().pathname.split("/")[1];
	const { handleModals, OpenUserDetails, participant } = useGlobalContext();
	const { onlineUsers } = useSocket();
	let active;
	onlineUsers?.forEach((i) =>
		i?.userId?.includes(currentChatUser?._id)
			? (active = "online")
			: (active = "ofline")
	);
	currentChatUser = { ...currentChatUser, status: active };

	return (
		<div className="header">
			<div className="wrapper">
				{Object.keys(participant).length > 0 ? (
					<div
						className="opened-user"
						onClick={() =>
							OpenUserDetails(participant, handleModals)
						}
					>
						<div className="img">
							{participant?.profilePicture && (
								<img
									src={participant?.profilePicture}
									alt="user"
								/>
							)}
						</div>
						<div className="name">
							<h5>{participant?.username}</h5>
							{isOnline && <p>online</p>}
						</div>
					</div>
				) : (
					<p
						className="not-selected"
						style={{ paddingLeft: "1rem" }}
					>
						user not selected
					</p>
				)}

			</div>
			<BiLeftArrow
				className="back"
				onClick={() => {
					responSive("left");
					localStorage.removeItem('convId')
					localStorage.removeItem('receiverId')
				}}
			/>
		</div>
	);
};

export default ChatHeader;
