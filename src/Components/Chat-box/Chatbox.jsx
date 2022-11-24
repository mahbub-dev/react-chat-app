import React, { useState, useRef } from "react";
import "./chatbox.scss";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { BsChevronLeft } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { useEffect } from "react";

function Chatbox({ username, room }) {
	const user = [];
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const socket = useRef();
	const scrollRef = useRef();
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket.current = io("ws://localhost:3001");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now,
			});
		});
	}, []);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
	}, [socket]);

	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(
				user.followings.filter((f) => users.some((u) => u.userId === f))
			);
		});
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);

		const messageData = {
			senderId: user._id,
			receiverId,
			text: currentMessage,
		};

		await socket.current.emit("sendMessage", messageData);

		setMessageList((list) => [...list, messageData]);
		setCurrentMessage("");
	};

	return (
		<div className="chat-box">
			<div className="header">
				<div className="back">
					<BsChevronLeft className="back-icon" />
				</div>
				<div className="person">
					<h3>{username}</h3>
				</div>
				<div className="img">
					<img
						src="http://cdn.onlinewebfonts.com/svg/img_312847.png"
						alt="person"
					/>
				</div>
			</div>

			{/* chat area  */}
			<div className="chat-area">
				<ScrollToBottom className="message-container">
					{messageList.map((messageContent) => (
						<div
							className="message"
							id={
								username === messageContent.author
									? "you"
									: "other"
							}
						>
							<div>
								<div className="message-content">
									<p>{messageContent.message}</p>
								</div>
								<div className="message-meta">
									<p id="time">{messageContent.time}</p>
									<p id="author">{messageContent.author}</p>
								</div>
							</div>
						</div>
					))}
				</ScrollToBottom>
			</div>

			<div className="sendbox">
				<div className="wrapper">
					<input
						type="text"
						placeholder="Type of message"
						value={currentMessage}
						onChange={(e) => {
							setCurrentMessage(e.target.value);
						}}
						onKeyPress={(e) => {
							e.key === "Enter" && handleSubmit();
						}}
					/>
					<ImAttachment className="attach" />
					<IoMdSend className="send" onClick={handleSubmit} />
				</div>
			</div>
		</div>
	);
}

export default Chatbox;
