import React, { useEffect, useState } from "react";
import "./messageinput.scss";
import { BsFillImageFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { createMessage, getMessage } from "../../Api Request/messageRequest";
import { useLocation } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { useGlobalContext } from "../../context";
import { useSocket } from "../../socketContext";
import TypingDots from "../TypingDots/TypingDots";
const MessageInput = ({ currentChat, setMessage }) => {
	const { socket, typingStatus } = useSocket();
	const { convId, message } = useGlobalContext();
	const sms = message;
	const [text, setText] = useState("");
	const [images, setImages] = useState([]);
	const location = useLocation().pathname.split("/")[2];
	const sender = localStorage.getItem("userId");
	const receiverId = localStorage.getItem("friendId");
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
		let message = {
			text,
			images,
		};

		if (currentChat) {
			if (text === "" && images.length < 1) {
				alert("কিছু একটা লেখ ভাই");
			} else if (sms === "not found") {
				if (text.toLowerCase() !== "assalamualaikum") {
					alert("You have to say assalamualaikum to start chat");
				} else {
					socket?.emit("sendMessage", {
						sender,
						receiverId,
						message,
					});
					createMessage(
						{ conversationId: convId, message },
						(res) => {
							if (res) {
								setMessage([res]);
							}
						}
					);
				}
			} else {
				socket?.emit("sendMessage", { sender, receiverId, message });
				createMessage({ conversationId: convId, message }, (res) => {
					if (res) {
						setMessage((p) => [...p, res]);
					}
				});
			}
		} else {
			alert("select a user");
		}
		setText("");
		setImages([]);
	};
	useEffect(() => {
		socket?.on("getMessage", (data) => {
			if (location === data?.sender) {
				setMessage((p) => [...p, data]);
			}
		});
	}, [socket]);

	useEffect(() => {
		let status = {
			isTyping: true,
			sender,
			receiverId,
		};
		if (text === "") {
			status.isTyping = false;
			socket.emit("sendTypingStatus", status);
		} else {
			socket.emit("sendTypingStatus", status);
		}
	}, [text]);
	return (
		<>
			{typingStatus.isTyping && typingStatus.sender === location && (
				<div className="typing-container">
					<TypingDots />
				</div>
			)}
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
									arr.filter((item2) => item2 !== item)
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
			<button className="sendBtn" onClick={() => handleOnEnter(text)}>
				Send
			</button>
		</>
	);
};

export default MessageInput;
