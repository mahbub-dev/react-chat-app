import React, { useEffect, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { BsFillImageFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import User from "../../../Components/User/User";
import 
import InputEmoji from "react-input-emoji";
import { useNavigate } from "react-router-dom";
import "./Desktop.scss";
import { useGlobalContext } from "../../../context";
const Desktop = () => {
	const navigate = useNavigate();
	const { handleModals, loggedUser } = useGlobalContext();
	const [images, setImages] = useState([]);
	const [text, setText] = useState("");
	const [searchResult, setSearchResult] = useState("");
	const [openUserChat, setOpenUserChat] = useState("");
	const [searchText, setSearchText] = useState("");

	const handleChange = (e) => {
		const file = document.querySelector("input[type=file]")["files"];
		const files = [];
		for (let i = 0; i < file.length; i++) {
			files.push(file[i]);
		}
		files.forEach((i) => {
			const reader = new FileReader();
			reader.readAsDataURL(i);
			reader.onload = () => {
				if (
					i.type === `image/jpg` ||
					i.type === "image/png" ||
					i.type === "image/jpeg"
				) {
					setImages((p) => [...p, reader.result]);
				} else {
					console.log("you can upload only jpg,png,jpeg file");
				}
			};
		});
	};

	const handleOnEnter = (text) => {
		const message = {
			text,
			images,
		};
		setText("");
		setImages([]);
		console.log(message);
	};

	const handleSearch = async () => {
		try {
			const { data } = await ApiRequest.get(
				`/user/?search=${searchText}`
			);
			setSearchResult(data);
			data === "not found" && setSearchResult("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		handleSearch();
	}, []);
	return (
		<div className="desktop">
			<div className="userlist">
				<div className="login-user">
					<h2 className="title">Chats</h2>
					<div
						className="logged-user"
						onClick={() => navigate("/profile")}
					>
						<img src={loggedUser?.profilePicture} alt="" />
						<h5>{loggedUser?.username}</h5>
					</div>
				</div>
				<div className="search">
					<input
						type="text"
						placeholder="Search"
						onChange={(e) => {
							setSearchText(e.target.value);
							handleSearch();
						}}
					/>
				</div>
				{searchResult
					? searchResult
							.filter((i) => i._id !== loggedUser?._id)
							.map((user, i, array) => (
								<div key={user._id}>
									<User
										array={array}
										user={user}
										openChat={setOpenUserChat}
									/>
								</div>
							))
					: "please wait ..."}
			</div>

			<div className="chatbox">
				{openUserChat ? (
					<div className="header">
						<div
							className="opened-user"
							onClick={() => handleModals(true, openUserChat)}
						>
							<div className="img">
								<img
									src={
										openUserChat?.profilePicture
											? openUserChat.profilePicture
											: "http://cdn.onlinewebfonts.com/svg/img_312847.png"
									}
									alt="user"
								/>
							</div>
							<div className="name">
								<h5>{openUserChat?.username}</h5>
								<p>Active</p>
							</div>
						</div>
						<hr />
					</div>
				) : (
					"no chat opened"
				)}

				<div className="inputField">
					<InputEmoji
						value={text}
						onChange={setText}
						cleanOnEnter
						onEnter={handleOnEnter}
						placeholder="Type a message"
					/>
					<div
						className="image-upload"
						style={{ display: `${!images && "none"}` }}
					>
						{images.map((item, index, arr) => (
							<div className="container" key={index}>
								<img src={item} alt="img" />
								<button
									onClick={() => {
										setImages(
											arr.filter(
												(item2) => item2 !== item
											)
										);
									}}
								>
									<ImCross />
								</button>
							</div>
						))}
					</div>
					<div>
						<label htmlFor="uploadImage">
							<input
								id="uploadImage"
								onChange={handleChange}
								type="file"
								multiple
								style={{ display: "none" }}
							/>
							<BsFillImageFill className="upload-image" />
						</label>
					</div>
					<button
						className="sendBtn"
						onClick={() => handleOnEnter(text)}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Desktop;
