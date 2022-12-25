import React from "react";
import { SlOptions } from "react-icons/sl";
import { useGlobalContext } from "../../../context";
import "./useroption.scss";

const UserOption = ({ convItem, handleDelConversation }) => {
	const { OpenUserDetails } = useGlobalContext();
	return (
		<div className="user-option-wrapper">
			<SlOptions className="option" />
			<div className="userOption">
				<button onClick={() => OpenUserDetails(convItem?.user)}>
					View profile
				</button>
				<button onClick={() => handleDelConversation(convItem?.convId)}>
					Delete chat
				</button>
			</div>
		</div>
	);
};

export default UserOption;
