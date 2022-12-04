import React from "react";
import { useNavigate } from "react-router-dom";
import { Actice } from "../..";
import { createConversation } from "../../../Api Request/conversationRequest";
import { useGlobalContext } from "../../../context";
import { UserOption } from "../../Modals/index";
import { useSocket } from "../../../socketContext";
import "./user.scss";

function User({ root, data, array, setCurrentChat }) {
	const { onlineUsers } = useSocket();
	const navigate = useNavigate();
	const { handleModals, setConvId } = useGlobalContext();
	let idArray = [];
	array?.forEach((i) => {
		idArray.push(i._id);
	});
	const openOption = (idArray) => {
		const filteredId = idArray.filter((item) => item !== data?._id);
		const userOptionDiv = document.getElementById(
			`user-option${data?._id}`
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
	let isOnline;
	onlineUsers.forEach((i) => {
		isOnline = i.userId.includes(data?._id);
	});
	const handleCoversation = () => {
		createConversation(data?._id, (res) => {
			setCurrentChat(data);
			setConvId(res._id);
			localStorage.setItem("friendId", data?._id);
			if (root) {
				navigate(`/${root}/${data?._id}`);
			} else {
				navigate(`/chat/${data?._id}`);
				
			}
		});
	};
	return (
		<div
			className="user"
			id={`user${data?._id}`}
			onClick={handleCoversation}
		>
			<div className="img">
				<img src={data?.profilePicture} alt="img" />
				<Actice isOnline={isOnline} id={data?._id} />
			</div>
			<div className="name">
				<h5>{data?.username}</h5>
				<p className="last-sms">{data?.message}</p>
			</div>
			<div className="time">
				<p>{data?.time}</p>
			</div>
			<div className="option" onClick={(e) => openOption(idArray)}>
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
			</div>
			<UserOption user={data} handleModals={handleModals} />
		</div>
	);
}

export default User;
