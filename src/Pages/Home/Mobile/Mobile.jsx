import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdMessage } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { Actice, Search, UserList } from "../../../Components";
import { Buttons } from "../../../Components/UserList/UserList";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import Chat from "../../Chat/Chat";
import "./Mobile.scss";

const Mobile = ({
	conversation,
	handleCoversation,
	currentChat,
	setCurrentChat,
	setConversation,
	allUser,
	message,
	setMessage,
	isFriendList,
	setIsFriendList,
}) => {
	const navigate = useNavigate();
	const { userList } = useGlobalContext();
	const { onlineUsers } = useSocket();
	const liveUsers = [];
	const location = useLocation().pathname.split("/")[1];
	userList &&
		userList.forEach((i) => {
			onlineUsers?.forEach((i2) => {
				i._id === i2.userId && liveUsers.push(i);
			});
		});

	useEffect(() => {
		if (location === "home") {
			document.querySelector(".rightside").style.display = "none";
		} else {
			document.querySelector(".mobile").style.display = "none";
		}
	}, [location]);
	return (
		<div className="mobile-container">
			<div className="mobile">
				<div className="top-area">
					<div className="header">
						<h1>Messages</h1>
						<div className="option">
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						</div>
					</div>

					{/* friendlist */}
					<div className="chatlist">
						{liveUsers &&
							liveUsers.map((i) => (
								<div className="friend" key={i._id}>
									<img
										src={i?.profilePicture}
										alt="profile"
									/>
									<Actice id={i._id} isOnline={true} />
								</div>
							))}
					</div>

					{/* search area  */}
					<Search />
				</div>
				<Buttons
					isFriendList={isFriendList}
					setIsFriendList={setIsFriendList}
				/>

				{/* recent chat list  */}
				<UserList
					conversation={conversation}
					setConversation={setConversation}
					handleCoversation={handleCoversation}
					currentChat={currentChat}
					setCurrentChat={setCurrentChat}
					setMessage={setMessage}
					allUser={allUser}
					isFriendList={isFriendList}
				/>

				{/* bottom bar  */}
				<div className="bar">
					<div className="icons">
						<div className="message">
							<MdMessage className="ico" />
						</div>
						<div className="contacts">
							<CgProfile
								className="ico"
								onClick={() => {
									navigate("/profile");
								}}
							/>
						</div>
						<div className="settings">
							<RiSettings3Fill className="ico" />
						</div>
					</div>
				</div>
			</div>

			{/* chat box area  */}
			<Chat
				device={"mobile"}
				currentChat={currentChat}
				setMessage={setMessage}
				message={message}
			/>
		</div>
	);
};

export default Mobile;
