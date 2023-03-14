import { useState } from "react";
import { useGlobalContext } from "../../../context";
import SmsOption from "./SmsOption";
import "./Message.scss";

function Message({ currentChat, message }) {
	const { handleModals, OpenUploadImage, lastSeen } = useGlobalContext();
	// console.log(lastSeen)
	const [showTime, setShowTime] = useState('none')
	return (
		<>
			<div id={message?.sender._id === localStorage.getItem('userId') ? "own" : "other"} className="messages">
				<div className="tooltip" style={{ display: showTime }}>
					{new Date(message.createdAt).toLocaleTimeString()}
				</div>
				<SmsOption message={message} />
				<div className="sms-wrapper" >
					{message?.replyRef &&
						<div className="repliedRef">
							<span>
								{message?.sender?._id === localStorage.getItem('userId') ? 'You' : message?.sender?.username.split(' ')[1]} replied
								to {message?.replyRef?.sender._id === localStorage.getItem('userId') ? 'you' : message.replyRef.sender.username.split(' ')[1]}
							</span>
							<span className="repliedSms">
								{message?.replyRef?.text}
							</span>
						</div>}
					<div style={{ display: "flex" }}>
						<img className="profileImg" title={message?.sender?.username} src={message?.sender?.profilePicture} alt="" />
						<div className="sms-wrapper">

							{message?.text !== "" &&
								<p onMouseEnter={(e) => { setShowTime('block') }} onMouseLeave={(e) => { setShowTime('none') }}>
									{message?.text}
								</p>}
							{message.react && <span className="showReact"><img src={message.react} alt="react" /></span>}

							{message?.images?.length > 0 &&
								message?.message.images.map((img, index) => (
									<img
										className="messageImg"
										onClick={() =>
											OpenUploadImage(img, handleModals)
										}
										key={index}
										src={img}
										alt={`img${index}`}
									/>
								))}

							{lastSeen?._id === message?._id && (
								<img
									src={currentChat[0]?.profilePicture}
									alt="seen"
									className="seen"
									title={`seen by ${currentChat[0]?.username.split(' ')[0]}`}
								/>
							)}
						</div>
					</div>
				</div>
			</div>

		</>
	);
}

export default Message;
