import React from "react";
import "./useroption.scss";

const UserOption = ({ user, handleModals }) => {
	return (
		<div id={`user-option${user?._id}`} className="user-option">
			<p onClick={() => handleModals(true, user)}>View profile</p>
			<p>Block</p>
			<p>Unblock</p>
		</div>
	);
};

export default UserOption;
