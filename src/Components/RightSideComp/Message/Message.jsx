import { format } from "timeago.js";
import { useGlobalContext } from "../../../context";
import "./Message.scss";

function Message({ i, unSeenIndex, m, own, user }) {
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
		<div id={m.sender._id === localStorage.getItem('userId') ? "own" : "other"} className="messages">
			<div>
				<div style={{ display: "flex" }}>
					<img title={m?.sender?.username} src={m?.sender?.profilePicture} alt="" />

					<div>
						{m?.text !== "" && <p>{m.text}</p>}
						{m?.images?.length > 0 &&
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

						{i === 2 && (
							<img
								src={user?.profilePicture}
								alt="seen"
								className="seen"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Message;
