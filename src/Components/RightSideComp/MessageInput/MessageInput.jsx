/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { createMessage } from "../../../Api Request/messageRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import playSound from "../../../Utils/playSound";
import TypingDots from "../TypingDots/TypingDots";
import Input from "./Input/Input";
import "./messageinput.scss";
const MessageInput = ({ currentChat, messages, setMessages }) => {
	const { socket, typingStatus } = useSocket();
	const { setUnreadMessage, soundRef } = useGlobalContext();
	const [text, setText] = useState("hsalkdsfsdf");
	const [images, setImages] = useState([]);
	const location = useLocation().pathname.split("/")[1];
	const sender = localStorage.getItem("userId");
	const locationRef = useRef(location);
	useEffect(() => {
		locationRef.current = location;
	}, [location]);
	const emitMessage = (message) => {
		socket?.emit("sendMessage", {
			sender,
			receiverId: location,
			message,
			conversationId: currentChat?.convId,
		});
	};
	const handleImageChange = (e) => {
		const file = document.querySelector("input[type=file]")["files"];
		const files = [];
		const image = [];
		let ready = false;
		const check = () => {
			if (ready) {
				setImages(image);
			}
		};
		setTimeout(check, 1000);
		for (let i = 0; i < file.length; i++) {
			files.push(file[i]);
		}

		for (let i = 0; i < files.length; i++) {
			const elem = files[i];
			const reader = new FileReader();
			reader.onloadend = (event) => {
				if (
					elem.type === `image/jpg` ||
					elem.type === "image/png" ||
					elem.type === "image/jpeg"
				) {
					image.push(event.target.result);
					ready = true;
				} else {
					alert("you can upload only jpg,png,jpeg file");
				}
			};
			reader.readAsDataURL(elem);
		}
	};
	// console.log(sms)
	const handleOnEnter = (text) => {
		let message = {
			text,
			images,
		};
		if (currentChat) {
			if (text === "" && images?.length < 1) {
				alert("কিছু একটা লেখ ভাই");
			} else if (messages.length === 0) {
				if (text.toLowerCase() !== "assalamualaikum") {
					alert(
						"You have to start chat with world greatest greetings 'Assalamualaikum' "
					);
				} else {
					emitMessage(message);
					createMessage(
						{ conversationId: currentChat.convId, message },
						(res) => res && setMessages([res])
					);
				}
			} else {
				emitMessage(message);
				createMessage(
					{ conversationId: currentChat?.convId, message },
					(res) => res && setMessages((p) => [...p, res])
				);
			}
		} else {
			alert("Please select a user");
		}
		setText("");
		setImages([]);
	};
	useEffect(() => {
		socket?.on("getMessage", (data) => {
			if (locationRef.current === data.sender) {
				setMessages((p) => [...p, data]);
			} else {
				setUnreadMessage((p) => [...p, data]);

				soundRef.current && playSound();
			}
		});
	}, [socket, location]);
	useEffect(() => {
		let status = {
			isTyping: true,
			sender,
			receiverId: location,
		};
		if (text === "") {
			status.isTyping = false;
			socket.emit("sendTypingStatus", status);
		} else {
			socket.emit("sendTypingStatus", status);
		}
	}, [text, socket, sender, location]);

	useEffect(() => {
		setText("");
	}, [location, setText]);
	return (
		<>
			{typingStatus.isTyping && typingStatus.sender === location && (
				<div className="typing-container">
					<TypingDots />
				</div>
			)}

			{/* text input  */}
			<Input
				value={text}
				setText={setText}
				handleOnEnter={handleOnEnter}
			/>

			{/* image input  */}
			<input
				id="uploadImage"
				onChange={handleImageChange}
				type="file"
				multiple
				style={{ display: "none" }}
			/>
		</>
	);
};

export default MessageInput;
