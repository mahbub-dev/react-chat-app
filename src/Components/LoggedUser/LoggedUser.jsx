import React from "react";
import "./LoggedUser.scss";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
const LoggedUser = () => {
	const navigate = useNavigate();
	const { loggedUser } = useGlobalContext();
	return (
		<div className="login-user">
			<h2 className="title">Chats</h2>
			<div className="logged-user" onClick={() => navigate("/profile")}>
				<img src={loggedUser?.profilePicture} alt="" />
				<h5>{loggedUser?.username}</h5>
			</div>
		</div>
	);
};

export default LoggedUser;
