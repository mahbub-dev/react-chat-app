/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { ImCross } from 'react-icons/im';
import ApiRequest from "../../../Api Request/apiRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { handleUpload } from "../../../Utils/functions";
import TypingDots from "../TypingDots/TypingDots";
import Input from "./Input/Input";
import "./messageinput.scss";

const MessageInput = ({ messages: conv, setMessages }) => {
	const { socket, sendDataToSocketServer, sendIsTypingStatusToSocketServer } = useSocket();
	const [typingStatus, setIsTypingStatus] = useState({})
	const { message: messages, _id, } = conv
	const { replyRefSms, chatList, setChatList } = useGlobalContext();
	const closeReply = useRef()
	const [text, setText] = useState("");
	const [images, setImages] = useState({});
	const [attachment, setAttachment] = useState([])
	const [uploadProgress, setUploadProgress] = useState('')
	// const sender = localStorage.getItem("userId");
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
			setMessages(p => {
				return { ...p, message: messages }
			})
		} catch (error) {
			console.log(error)
		}
	}
	// console.log(sms)
	const handleOnEnter = (text) => {
		let inputedMessage = {};
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
					alert(" Please start chat with 'Assalamualaikum' ");
					return
				}
			}
			if (uploadProgress === '' || uploadProgress === 100) {
				const m = [text, images, ...attachment]
				m.forEach(item => {
					if (typeof item === 'string') {
						handleMessageSent(_id, { ...inputedMessage, text: item })
					} else {
						Object.keys(item).length > 0 &&
							setTimeout(() => {
								handleMessageSent(_id, { ...inputedMessage, attachment: item, text: '' })
							}, 10);
					}
				})
			} else {
				alert('Please wait until the upload  is finished')
				return
			}
		} else {
			alert("Please select a user");
		}
		setText("");
		setAttachment({})
		setUploadProgress('')
		setImages([]);
	};


	// send typing status
	useEffect(() => {
		if (text === "") {
			sendIsTypingStatusToSocketServer(false)
		} else {
			sendIsTypingStatusToSocketServer(true)
		}
	}, [text]);

	// get typing status 
	useEffect(() => {
		socket.on('getTypingStatus', (data) => {
			setIsTypingStatus(data)
		})
	}, [socket])
	useEffect(() => {
		setText("");
	}, [setText]);
	return (
		<>
			{/* reply ref  */}
			<div className="reply-info" ref={closeReply} >
				<p className="reply_to"><span> replying to: <b>{replyRefSms?.sender?.username}</b></span>
					<button onClick={(e) => {
						closeReply.current.style.display = 'none'
					}}>
						<ImCross className="unselect-reply" />
					</button>
				</p>
				<p>{replyRefSms?.text}</p>
			</div >

			{/* typing status  */}
			{
				typingStatus.isTyping && localStorage.getItem('receiverId') === typingStatus.senderId && (
					<div className="typing-container">
						<TypingDots />
					</div>
				)
			}

			{uploadProgress &&
				<div className="uploadProgress">
					<p>uploading progress {uploadProgress}%</p>
				</div>
			}
			{/* text input  */}
			<Input
				value={text}
				setText={setText}
				handleOnEnter={handleOnEnter}
			/>

			{
				images?.length > 0 && (
					<div className="images">
						{images.map((i, index) => (
							<img src={i} alt={"img"} key={index} />
						))}
					</div>
				)
			}

			{/* attachment input  */}
			<input
				id={(uploadProgress === '' || uploadProgress === 100) ? "attachment" : ''}
				onChange={async (e) => {
					const res = await handleUpload(e, 'attach', (progress) => setUploadProgress(progress))
					setAttachment(res)
				}
				}
				type="file"
				multiple
				max={2}
				accept='application/pdf,audio/*,video/*'
				style={{ display: "none" }}
			/>

			<input
				id={(uploadProgress === '' || uploadProgress === 100) ? "uploadImage" : ''}
				onChange={async (e) => {
					const res = await handleUpload(e, 'image', (progress) => {
						setUploadProgress(progress)
					})
					setImages(res);
				}
				}
				type="file"
				accept="image/*"
				multiple
				style={{ display: "none" }}
			/>
		</>
	);
};

export default MessageInput;
