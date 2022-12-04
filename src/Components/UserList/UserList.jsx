import React from "react";
import { useGlobalContext } from "../../context";
import User from "./User/User";
import "./userlist.scss";

const UserList = () => {
	const { loggedUser, userList, setCurrentChat } = useGlobalContext();
	return (
		<div className="userlist">
			{userList
				? userList
						.filter((i) => i._id !== loggedUser?._id)
						.map((friend, ind, arr) => (
							<div key={friend._id}>
								<User
									array={arr}
									data={friend}
									setCurrentChat={setCurrentChat}
								/>
							</div>
						))
				: "please wait ..."}
		</div>
	);
};

export default UserList;
