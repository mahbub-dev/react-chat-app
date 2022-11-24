import React, { useState } from "react";
import "./user.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";

import { UserOption } from "../Modals/index";

function User({ user, array, openChat }) {
	const { handleModals } = useGlobalContext();
	let idArray = [];
	array?.forEach((i) => {
		
		idArray.push(i._id);
	});
	const openOption = (idArray) => {
		const filteredId = idArray.filter((item) => item !== user?._id);
		const userOptionDiv = document.getElementById(
			`user-option${user?._id}`
		);
		if (userOptionDiv.style.display === "none") {
			userOptionDiv.style.display = "flex";
			filteredId.forEach((i) => {
				let commonDiv = document.getElementById(`user-option${i}`);
				commonDiv.style.display = "none";
			});
		} else {
			userOptionDiv.style.display = "none";
		}
	};
	return (
		<div
			className="user"
			id={`user${user?._id}`}
			onClick={() => openChat(user)}
		>
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
			<div className="name">
				<h5>{user?.username}</h5>
				<p className="last-sms">{user?.message}</p>
			</div>
			<div className="time">
				<p>{user?.time}</p>
			</div>
			<div className="option" onClick={(e) => openOption(idArray)}>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
			</div>
			<UserOption user={user} handleModals={handleModals} />
		</div>
	);
}

export default User;
