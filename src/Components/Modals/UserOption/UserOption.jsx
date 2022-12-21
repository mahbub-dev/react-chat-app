import React from "react";
import { SlOptions } from "react-icons/sl";
import { useGlobalContext } from "../../../context";
import "./useroption.scss";

const UserOption = ({ user, convItem, handleDelConversation }) => {
	const { OpenUserDetails } = useGlobalContext();
	return (
		<div className="user-option-wrapper">
			<SlOptions className="option" />
			<div className="userOption">
				<button onClick={() => OpenUserDetails(user)}>
					View profile
				</button>
				<button onClick={() => handleDelConversation(convItem._id)}>
					Delete
				</button>
				<button>Block</button>
			</div>
		</div>
	);
};

export default UserOption;
