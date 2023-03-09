import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useGlobalContext } from "../../../context";
import { getSendDate } from "../../../Utils/functions";
import SmsOption from "./SmsOption";
import "./Message.scss";

function Message({ i, message, array }) {
	// console.log(messages)
	const { handleModals, OpenUploadImage } = useGlobalContext();
	const [showTime, setShowTime] = useState('none')
	const [showDate, setShowDate] = useState('')
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
	const sendAt = getSendDate(message.createdAt)
	// console.log(sendAt)

	return (
		<>
			<div id={message?.sender._id === localStorage.getItem('userId') ? "own" : "other"} className="messages">
				<div className="tooltip" style={{ display: showTime }}>
					{new Date(message.createdAt).toLocaleTimeString()}
				</div>
				<SmsOption message={message} />
				<div>
					<div style={{ display: "flex" }}>
						<img className="profileImg" title={message?.sender?.username} src={message?.sender?.profilePicture} alt="" />
						<div>
							{message?.text !== "" && <p onMouseEnter={(e) => { setShowTime('block') }} onMouseLeave={(e) => { setShowTime('none') }}>{message?.text}</p>}
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
