import { useLocation } from "react-router-dom";
import { format } from "timeago.js";
import { useGlobalContext } from "../../../context";
import "./Message.scss";

function Message({ m, own, other, user }) {
	// const { isTyping } = useSocket();
	const location = useLocation().pathname.split("/")[1];
	const { handleModals, OpenUploadImage } = useGlobalContext();
	let time = format(m.createdAt).split(" ");
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
					{!own && <img src={user?.profilePicture} alt="" />}
					<div>
						{m?.message?.text !== "" && <p>{m?.message?.text}</p>}
						{m?.message?.images?.length > 0 &&
							m.message.images.map((img, index) => (
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
