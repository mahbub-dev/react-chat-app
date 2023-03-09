/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiRequest from "../../../Api Request/apiRequest";
import { updateConversation } from "../../../Api Request/conversationRequest";
import { createMessage } from "../../../Api Request/messageRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { handleImageChange, playSound } from "../../../Utils/functions";
import TypingDots from "../TypingDots/TypingDots";
import Input from "./Input/Input";
import "./messageinput.scss";

const MessageInput = ({ currentChat, messages: conv, setMessages }) => {
	const { socket, typingStatus } = useSocket();
	const { message: messages, _id, } = conv
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
	// function for sending message 
	const handleMessageSent = async (convId, message) => {
		try {
			emitMessage(message);
			const res = await ApiRequest.post(`conversation/message/`, {
				convId,
				message,
			});
			// console.log(res.data);
			messages.push(res.data)
			console.log(messages)
			setMessages(p => ({ ...p, message:messages }))
		} catch (error) {
			console.log(error.response.data)
		}
	}
	// console.log(sms)
	const handleOnEnter = (text) => {
		let inputedMessage = {
			text,
			images,
		};
		if (_id) {
			if (text === "" && images?.length < 1) {
				alert("Please write something before send");
				return
			}
			if (messages.length === 0) {
				if (!text.toLowerCase().startsWith("assalamualaikum") || !text.toLowerCase().endsWith("assalamualaikum")) {
					alert(" Pleas start chat with 'Assalamualaikum' ");
					return
				}
			}
			handleMessageSent(_id, inputedMessage)
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

			const sendSeenStatus = (status) => {
				socket.emit("isSeen", {
					conversationId: data.conversationId,
					sender: localStorage.getItem("userId"),
					isOpended: status,
					receiverId: data.sender,
				});
			};

			if (locationRef.current === data.sender) {
				setMessages((p) => [...p, data]);
				updateConversation({ convId: data?.conversationId });
				sendSeenStatus(true);
			} else {
				setUnreadMessage((p) => [...p, data]);
				sendSeenStatus(false);
				soundRef.current === "yes" && playSound();
			}
		});
	}, [socket, location]);

	// send typing status
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
