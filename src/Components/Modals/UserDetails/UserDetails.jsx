import React from "react";
import { TiDelete } from "react-icons/ti";
import { useGlobalContext } from "../../../context";
import "./userdetails.scss";
const UserDetails = () => {
	const { handleModals, user } = useGlobalContext();
	return (
		<div className="user-details">
			<div
				className="close-modals"
				onClick={() => handleModals(false, "user-details")}
			>
				<TiDelete className="close" />
			</div>
			<div className="img">
				<img
					src={
						user?.profilePicture
							? user.profilePicture
							: "http://cdn.onlinewebfonts.com/svg/img_312847.png"
					}
					alt="img"
				/>
			</div>
			<h4>{user?.username}</h4>
			<div className="other">
				<p>Email: {user?.email ? user.email : ""}</p>
				<p>Phone: {user?.phone ? user.phone : ""}</p>
				<p>status: {user?.status ? user.status : "ofline"}</p>
			</div>
		</div>
	);
};

export default UserDetails;
