import { IoIosArrowRoundBack } from "react-icons/io";
import "./chatheader.scss";
import { useGlobalContext } from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../../socketContext";
const ChatHeader = () => {
	const navigate = useNavigate();
	const location = useLocation().pathname.split("/")[2];
	const { handleModals, OpenUserDetails, currentChat } = useGlobalContext();
	const { onlineUsers } = useSocket();
	let active;
	onlineUsers?.forEach((i) =>
		i.userId.includes(currentChat?._id) ? (active = "online") : ""
	);
	return (
		<div className="header">
			<div className="wrapper">
				{localStorage.getItem("friendId") ? (
					<div
						className="opened-user"
						onClick={() =>
							OpenUserDetails(currentChat, handleModals)
						}
					>
						<div className="img">
							{currentChat?.profilePicture && (
								<img
									src={currentChat?.profilePicture}
									alt="user"
								/>
							)}
						</div>
						<div className="name">
							<h5>{currentChat?.username}</h5>
							<p>{active} </p>
						</div>
					</div>
				) : (
					<p className="not-selected" style={{paddingLeft:'1rem'}}>user not selected</p>
				)}
				<IoIosArrowRoundBack
					className="back"
					onClick={() => {
						navigate(`/chat/${location}`);
					}}
				/>
			</div>
			<hr />
		</div>
	);
};

export default ChatHeader;
