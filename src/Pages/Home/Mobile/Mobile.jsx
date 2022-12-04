import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdMessage } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import User from "../../../Components/UserList/User/User";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { useNavigate } from "react-router-dom";
import { Search, Actice } from "../../../Components";
import "./Mobile.scss";

const Mobile = () => {
	const navigate = useNavigate();
	const { userList, setCurrentChat } = useGlobalContext();
	const { onlineUsers } = useSocket();
	const liveUsers = [];
	userList &&
		userList.forEach((i) => {
			onlineUsers?.forEach((i2) => {
				i._id === i2.userId && liveUsers.push(i);
			});
		});
	return (
		<div className="mobile">
			<div className="top-area">
				<div className="header">
					<h1>Messages</h1>
					<div className="option">
						<div className="dot"></div>
						<div className="dot"></div>
						<div className="dot"></div>
					</div>
				</div>

				{/* friendlist */}
				<div className="chatlist">
					{liveUsers &&
						liveUsers.map((i) => (
							<div className="friend" key={i._id}>
								<img src={i?.profilePicture} alt="profile" />
								<Actice id={i._id} isOnline={true} />
							</div>
						))}
				</div>

				{/* search area  */}
				<Search />
			</div>

			{/* recent chat list  */}
			<div className="recent">
				{userList &&
					userList.map((i, ind, arr) => (
						<div key={ind}>
							<User
								root={"message"}
								data={i}
								array={arr}
								setCurrentChat={setCurrentChat}
							/>
						</div>
					))}
			</div>

			{/* bottom bar  */}
			<div className="bar">
				<div className="icons">
					<div className="message">
						<MdMessage className="ico" />
					</div>
					<div className="contacts">
						<CgProfile
							className="ico"
							onClick={() => {
								navigate("/profile");
							}}
						/>
					</div>
					<div className="settings">
						<RiSettings3Fill className="ico" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Mobile;
