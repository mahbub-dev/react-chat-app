/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiRequest from "../../../Api Request/apiRequest";
import { updateConversation, updateSeenStatus } from "../../../Api Request/conversationRequest";
import { createMessage } from "../../../Api Request/messageRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { ImCross } from 'react-icons/im'
import { handleImageChange, playSound } from "../../../Utils/functions";
import TypingDots from "../TypingDots/TypingDots";
import Input from "./Input/Input";
import "./messageinput.scss";

const MessageInput = ({ messages: conv, setMessages }) => {
	const { socket, typingStatus, sendDataToSocketServer } = useSocket();
	const { message: messages, _id, } = conv
	const { setUnreadMessage, soundRef, replyRefSms, chatList, setChatList } = useGlobalContext();
	const closeReply = useRef()
	const [text, setText] = useState("");
	const [images, setImages] = useState([]);
	const location = useLocation().pathname.split("/")[1];
	const sender = localStorage.getItem("userId");
	// function for sending message 
	const handleMessageSent = async (convId, message) => {
		try {
			let { data } = await ApiRequest.post(`conversation/message/`, {
				convId,
				message,
			});
			// console.log(res.data);
			if (data?.replyRef) {
				data.replyRef = replyRefSms
				closeReply.current.style.display = 'none'
			}
			messages.push(data)
			sendDataToSocketServer(messages)
			const updateConv = [...chatList]
			let addLastestMessage = updateConv?.find(i => i._id === localStorage.getItem('receiverId'));
			addLastestMessage.lastSms = data
			setChatList(p => updateConv)
			setMessages(p => ({ ...p, message: messages }))
		} catch (error) {
			console.log(error)
		}
	}
	// console.log(sms)
	const handleOnEnter = (text) => {
		let inputedMessage = {
			text,
			images,
			seenBy: localStorage.getItem('userId')
		};
		// if there reply ref 
		if (replyRefSms?._id) {
			inputedMessage.replyRef = replyRefSms._id
		}

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
			{/* reply ref */}
			<div className="reply-info" ref={closeReply}>
				<p className="reply_to"><span> replying to: <b>{replyRefSms?.sender?.username}</b></span>
					<button onClick={(e) => {
						closeReply.current.style.display = 'none'
					}}>
						<ImCross className="unselect-reply" />
					</button>
				</p>
				<p>{replyRefSms?.text}</p>
			</div>

			{/* typing status  */}
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
