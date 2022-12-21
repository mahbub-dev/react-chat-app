import React, { useEffect, useState } from "react";
import { deleteConversation } from "../../Api Request/conversationRequest";
import emptyImg from "../../Image/3d-puppet-with-empty-opened-box-R8YYYR-removebg-preview.png";
import AllUser from "./AllUser/AllUser";
import User from "./User/User";
import "./userlist.scss";

const UserList = ({
	conversation,
	setConversation,
	currenChat,
	setMessage,
	setCurrentChat,
	handleCoversation,
	allUser,
	isFriendList,
}) => {
	const [deleteData, setDeleteData] = useState([]);
	const [notAddedUser, setNotAddedUser] = useState([]);
	const handleDelConversation = (id) => {
		setDeleteData((p) => [...p, id]);
		setCurrentChat({});
		setMessage([]);
		deleteConversation(id, (res) => {
			setConversation((p) =>
				p.filter((i) => i._id !== res._id && i !== "empty")
			);
		});
	};

	useEffect(() => {
		const friendId = [];
		conversation?.forEach((c) => {
			friendId.push(
				c?.member?.find(
					(item) => item !== localStorage.getItem("userId")
				)
			);
		});
		const filterId = allUser?.filter((i) =>
			friendId.every((item) => i !== item)
		);

		if (conversation.length === 0) {
			setConversation(["empty"]);
		}
		setNotAddedUser(filterId);
	}, [conversation, setNotAddedUser, allUser, setConversation]);

	const allusers = (
		<>
			{notAddedUser
				? notAddedUser.map((i) => {
						return (
							<div key={i}>
								<AllUser
									userId={i}
									setConversation={setConversation}
									conversation={conversation}
								/>
							</div>
						);
				  })
				: "loading..."}
		</>
	);
	const friendList = (
		<>
			{conversation && conversation[0] !== "empty" ? (
				conversation.map((item, index, array) => {
					return (
						<div
							className="item"
							key={index}
							style={{
								backgroundColor:
									currenChat?._id === item._id
										? "rgb(84 63 63 / 50%)"
										: "initial",
								display:
									deleteData.includes(item._id) && "none",
							}}
						>
							<User
								convItem={item}
								handleCoversation={handleCoversation}
								handleDelConversation={handleDelConversation}
							/>
						</div>
					);
				})
			) : (
				<img style={{ width: "100%" }} src={emptyImg} alt="empty" />
			)}
		</>
	);

	return (
		<div className="userlist">{isFriendList ? friendList : allusers}</div>
	);
};

export default UserList;

const Buttons = ({ isFriendList, setIsFriendList }) => {
	const clickedButton = {
		color: "black",
	};
	const notClickedButton = {
		background: "black",
		transform: "scale(1.0)",
	};
	return (
		<div className="buttons">
			<button
				style={isFriendList ? clickedButton : notClickedButton}
				className="btn1"
				onClick={() => setIsFriendList(false)}
			>
				Add Friends
			</button>
			<button
				style={isFriendList ? notClickedButton : clickedButton}
				className="btn2"
				onClick={() => setIsFriendList(true)}
			>
				Friends
			</button>
		</div>
	);
};
export { Buttons };

