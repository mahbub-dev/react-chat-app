import React from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import User from "../../../Components/User/User";
import "./Mobile.scss";

const Mobile = () => {
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
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
					<div className="friend">
						<img
							src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
							alt=""
						/>
					</div>
				</div>

				{/* search area  */}
				<div className="search">
					<input type="text" placeholder="Search" />
					<BiSearch className="search-icon" />
				</div>
			</div>

			{/* recent chat list  */}
			<div className="recent">
				<User
					username={"Md Mahbub Alom"}
					img={
						'http://cdn.onlinewebfonts.com/svg/img_312847.png" alt="user'
					}
					time={"2.50pm"}
					message={"hey There"}
				/>
				<User
					username={"Md Habibur Rohman"}
					img={
						'http://cdn.onlinewebfonts.com/svg/img_312847.png" alt="user'
					}
					time={"2.50pm"}
					message={"hey There"}
				/>
			</div>

			{/* bottom bar  */}
			<div className="bar">
				<div className="icons">
					<div className="message">
						<MdMessage className="ico" />
					</div>
					<div className="contacts">
						<IoMdContacts className="ico" />
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
