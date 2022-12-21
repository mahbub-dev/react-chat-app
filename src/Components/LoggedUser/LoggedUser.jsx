import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./LoggedUser.scss";
const LoggedUser = () => {
	const navigate = useNavigate();
	const { loggedUser } = useGlobalContext();
	return (
		<div className="login-user">
			<h2 className="title">Chats</h2>
			<div className="logged-user" onClick={() => navigate("/profile")}>
				{loggedUser?.profilePicture ? (
					<img src={loggedUser?.profilePicture} alt="" />
				) : (
					"Loading..."
				)}
				<h5>{loggedUser?.username}</h5>
			</div>
		</div>
	);
};

export default LoggedUser;
