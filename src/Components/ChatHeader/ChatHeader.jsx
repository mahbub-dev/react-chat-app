import { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
import { useGlobalContext } from "../../context";
import { useSocket } from "../../socketContext";
import "./chatheader.scss";
const ChatHeader = ({ currentChatUser, setCurrenChatUser }) => {
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
	useEffect(() => {
		const getCurrentUser = async () => {
			const { data } = await ApiRequest(`user/${location}`);
			setCurrenChatUser(data);
		};
		getCurrentUser();
	}, []);
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
								<p>{active} </p>
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
				<IoIosArrowRoundBack
					className="back"
					onClick={() => {
						document.querySelector(".mobile").style.display =
							"block";
						document.querySelector(".rightside").style.display =
							"none";
						navigate("/home");
					}}
				/>
			</div>
			<hr />
		</div>
	);
};

export default ChatHeader;
