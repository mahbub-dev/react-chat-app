import React, { useEffect, useState } from "react";
import { createConversation } from "../../../../Api Request/conversationRequest";
import { useGlobalContext } from "../../../../context";
import { UserLoader } from "../../../index";
import "../User/user.scss";
import "./AllUser.scss";

function AllUser({ userId, setConversation, conversation }) {
	const { searchValue } = useGlobalContext();
	const [display, setDisplay] = useState(false);
	useEffect(() => {
		// const userId = convItem?.member?.find(
		// 	(i) => i !== localStorage.getItem("userId")
		//
	}, [userId, searchValue]);
	return (
		<>
			{userId && Object.keys(userId).length ? (
				<div
					className="user"
					id={`user${userId?._id}`}
					style={{ display: display ? "none" : "flex" }}
				>
					<div className="img">
						<img src={userId?.profilePicture} alt="img" />
					</div>
					<div className="name">
						<h5>{userId?.username}</h5>
					</div>
					<div className="time">
						<p>{userId?.time}</p>
					</div>
					<button
						className="addFrdBtn"
						onClick={() =>
							createConversation(userId._id, (res) => {
								conversation[0] === "empty"
									? setConversation([res])
									: conversation.findIndex(
											(i) => i._id === res._id
									  ) === -1 &&
									  setConversation((p) => [...p, res]);
								setDisplay(true);
							})
						}
					>
						<img
							src="https://cdn-icons-png.flaticon.com/128/3024/3024515.png"
							alt="add"
						/>
					</button>
				</div>
			) : (
				<UserLoader />
			)}
		</>
	);
}
export default AllUser;
