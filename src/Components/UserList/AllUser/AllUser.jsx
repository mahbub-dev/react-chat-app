import React, { useEffect, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { createConversation } from "../../../Api Request/conversationRequest";
import { useGlobalContext } from "../../../context";
import UserLoader from "../../UserLoader/UserLoader";
import "../User/user.scss";
import "./AllUser.scss";

function AllUser({ userId, setConversation, conversation }) {
	const { handleModals } = useGlobalContext();
	const [user, setUser] = useState([]);
	useEffect(() => {
		// const userId = convItem?.member?.find(
		// 	(i) => i !== localStorage.getItem("userId")
		// );
		const getFiriendUser = async () => {
			const res = await ApiRequest.get(`/user/${userId}`);
			setUser(res.data);
		};
		getFiriendUser();
	}, [userId]);
	return (
		<>
			{Object.keys(user).length > 0 ? (
				<div className="user" id={`user${user?._id}`}>
					<div className="img">
						<img src={user?.profilePicture} alt="img" />
					</div>
					<div className="name">
						<h5>{user?.username}</h5>
					</div>
					<div className="time">
						<p>{user?.time}</p>
					</div>
					<button
						className="addFrdBtn"
						onClick={() =>
							createConversation(user._id, (res) => {
								conversation[0] === "empty"
									? setConversation([res])
									: conversation.findIndex(
											(i) => i._id === res._id
									  ) === -1 &&
									  setConversation((p) => [...p, res]);
							})
						}
					>
						Add
					</button>
				</div>
			) : (
				<UserLoader />
			)}
		</>
	);
}
export default AllUser;
