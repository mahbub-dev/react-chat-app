/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateConversation } from "../../../Api Request/conversationRequest";
import { createMessage } from "../../../Api Request/messageRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { handleImageChange, playSound } from "../../../Utils/functions";
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

	// send unseen

	const emitMessage = (message) => {
		socket?.emit("sendMessage", {
			sender,
			receiverId: location,
			message,
			conversationId: currentChat?.convId,
		});
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
						(res) => {
							if (res) {
								setMessages([res]);
							}
						}
					);
				}
			} else {
				emitMessage(message);
				createMessage(
					{ conversationId: currentChat?.convId, message },
					(res) => {
						if (res) {
							setMessages((p) => [...p, res]);
						}
					}
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
			updateConversation({
				convId: data?.conversationId,
				lastSms: {
					sender: data?.sender,
					sms: data?.message?.text,
					timestamps: data?.createdAt,
				},
			});
			if (locationRef.current === data.sender) {
				setMessages((p) => [...p, data]);
				updateConversation({ convId: data?.conversationId });
			} else {
				setUnreadMessage((p) => [...p, data]);
				socket.emit("isSeen", {
					totalUnseen: 1,
					conversationId: data.conversationId,
					sender: localStorage.getItem("userId"),
					receiverId: data.sender,
				});
				soundRef.current === "yes" && playSound();
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
			{images.length > 0 && (
				<div className="images">
					{images.map((i, index) => (
						<img src={i} alt={"img"} key={index} />
					))}
				</div>
			)}
			{/* image input  */}
			<input
				id="uploadImage"
				onChange={() =>
					handleImageChange((result) => {
						setImages(result);
					})
				}
				type="file"
				multiple
				style={{ display: "none" }}
			/>
		</>
	);
};

export default MessageInput;
