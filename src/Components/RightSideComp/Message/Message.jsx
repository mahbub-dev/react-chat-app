import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context";
import SmsOption from "./SmsOption";
import "./Message.scss";

function Message({ i, message, handleReply }) {
	// console.log(messages)
	const { handleModals, OpenUploadImage } = useGlobalContext();
	const [showTime, setShowTime] = useState('none')
	// let time = format(message?.createdAt).split(" ");
	// if (time.length === 3) {
	// 	time[2] = null;
	// 	time[1] === "seconds" && (time[1] = "s");
	// 	time[1] === "minutes" && (time[1] = "m");
	// 	time[1] === "hours" && (time[1] = "h");
	// 	time[1] === "day" && (time[1] = "d");
	// } else {
	// 	time = "Just now";
	// }
	let replySender = ''
	if (message.sender._id === localStorage.getItem('userId') || message?.replyRef?.sender._id === localStorage.getItem('userId')) {
		replySender = 'You'
	}
	return (
		<>
			<div id={message?.sender._id === localStorage.getItem('userId') ? "own" : "other"} className="messages">
				<div className="tooltip" style={{ display: showTime }}>
					{new Date(message.createdAt).toLocaleTimeString()}
				</div>
				<SmsOption message={message} handleReply={handleReply} />
				<div className="sms-wrapper" >
					{message?.replyRef &&
						<div className="repliedRef">
							<span>
								{message.sender._id === localStorage.getItem('userId') ? 'You' : message.sender.username.split(' ')[1]} replied
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

							{i === 1 && (
								<img
									src={''}
									alt="seen"
									className="seen"
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
