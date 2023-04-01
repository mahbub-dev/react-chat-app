/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { ImCross } from 'react-icons/im';
import ApiRequest from "../../../Api Request/apiRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import { handleUpload } from "../../../Utils/functions";
import { TiDelete } from "react-icons/ti";
import TypingDots from "../TypingDots/TypingDots";
import Input from "./Input/Input";
import "./messageinput.scss";

const MessageInput = ({ messages: conv, setMessages }) => {
	const { socket, sendDataToSocketServer, sendIsTypingStatusToSocketServer } = useSocket();
	const [typingStatus, setIsTypingStatus] = useState({})
	const { message: messages, _id, } = conv
	const { replyRefSms, setReplyRefSms, chatList, setChatList, conversation } = useGlobalContext();
	const closeReply = useRef()
	const [text, setText] = useState("");
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
			if (text === "" && attachment?.length < 0) {
				alert("Please add something before send");
				return
			}
			if (messages.length === 0) {
				if (!text.toLowerCase().startsWith("assalamualaikum") || !text.toLowerCase().endsWith("assalamualaikum")) {
					alert(" Please start chat with 'Assalamualaikum' ");
					return
				}
			}
			if (uploadProgress === '' || uploadProgress === 100) {
				const m = [text, ...attachment]
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
				setReplyRefSms({})
			} else {
				alert('Please wait until the upload  is finished')
				return
			}
		} else {
			alert("Please select a user");
		}
		setText("");
		setAttachment([])
		// setImages({});
	};
	// remove uploads 
	const removeUpload = async (item) => {
		try {
			item.links.forEach(async i => {
				await ApiRequest.delete(`/uploads/?path=${i}`)
			})
			setAttachment(p => {
				return p.filter(i => i.fileType !== item.fileType)
			})

		} catch (error) {
			console.log(error)
		}
	}
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

	// clearing all state on user change 
	useEffect(() => {
		setText("");
		setAttachment([])
		// setImages([]);
	}, [conversation]);
	return (
		<>
			{/* reply ref  */}
			<div className="reply-info" ref={closeReply} >
				<p className="reply_to"><span> replying to: <b>{replyRefSms?.sender?.username}</b></span>
					<button onClick={(e) => {
						setReplyRefSms({})
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

			{/* {
				images?.links?.length > 0 && (
					<div className="images">
						{images?.links?.map((i, index) => (
							<div className="upload-image-wrapper" key={index}>
								<button onClick={() => removeUpload(i)} className="btn-upload-close" >
									<TiDelete className="close" />
								</button>
								<img src={i} alt={"img"} key={index} />
							</div>
						))}
					</div>
				)
			} */}

			{
				attachment.length > 0 &&
				<div className="attach">
					{attachment?.map((item, index) =>
						<div className="element" key={index}>
							<button className="btn-upload-close" onClick={() => removeUpload(item)}>
								<TiDelete className="close" />
							</button>
							<p>{item.fileType}</p>
							<span>
								{item.links.length}
							</span>
						</div>
					)}
				</div>
			}


			{/* attachment input  */}
			{/* the following input tags are attach with label in input component  */}
			<input
				id={uploadProgress === '' ? "attachment" : ''}
				onChange={async (e) => {
					const res = await handleUpload(e, (progress) => {
						if (progress === 100) {
							setUploadProgress('')
						} else
							setUploadProgress(progress)
					})
					console.log(res)
					setAttachment(p => {
						return [...p, ...res]
					})
				}
				}
				type="file"
				multiple
				max={2}
				style={{ display: "none" }}
			/>

			{/* <input
				id={(uploadProgress === '') ? "uploadImage" : ''}
				onChange={async (e) => {
					const res = await handleUpload(e, 'image', (progress) => {
						if (progress === 100) {
							setUploadProgress('')
						} else
							setUploadProgress(progress)
					})
					setImages(res);
				}
				}
				type="file"
				accept="image/*"
				multiple
				style={{ display: "none" }}
			/> */}
		</>
	);
};

export default MessageInput;
