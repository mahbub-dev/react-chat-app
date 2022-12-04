import { format } from "timeago.js";
import "./Message.scss";
import { useGlobalContext } from "../../context";
import { useSocket } from "../../socketContext";

function Message({ messages, own, profilePicture }) {
	// const { isTyping } = useSocket();
	const { handleModals, OpenUploadImage } = useGlobalContext();
	let time = format(messages.createdAt).split(" ");
	if (time.length === 3) {
		time[2] = null;
		time[1] === "seconds" && (time[1] = "s");
		time[1] === "minutes" && (time[1] = "m");
		time[1] === "hours" && (time[1] = "h");
		time[1] === "day" && (time[1] = "d");
	} else {
		time = "Just now";
	}
	return (
		<div id={own ? "own" : "other"} className="messages">
			<div>
				<div style={{ display: "flex" }}>
					{!own && <img src={profilePicture} alt="" />}
					<div>
						{messages?.message?.text !== "" && (
							<p>{messages?.message?.text}</p>
						)}
						{messages?.message?.images?.length > 0 &&
							messages.message.images.map((img, index) => (
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

						<span>{time}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Message;
