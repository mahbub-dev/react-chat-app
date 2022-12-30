import React, { useState } from "react";
import { BsEmojiSmile, BsFillImageFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import emojiCode from "./emojicode";
import "./input.scss";

const Input = ({ setText, value, handleOnEnter }) => {
	const [imojiStyle, setImojiStyle] = useState({ display: "none" });
	const handldeTextChange = (e) => {
		setText(e.target.value);
	};
	return (
		<div className="textInput">
			<div className="icons">
				<button
					style={{
						display: "flex",
						background: "none",
						border: "none",
						outline: "none",
					}}
					className="emoji"
				>
					<BsEmojiSmile className=" icon" />
				</button>

				<div className="customEmoji" style={imojiStyle}>
					{emojiCode.map((i, ind) => (
						<div
							key={ind}
							className={`item item${ind}`}
							onClick={() =>
								setText((p) => [...p, i.props?.children])
							}
						>
							{i}
						</div>
					))}
				</div>

				<label htmlFor="uploadImage">
					<BsFillImageFill className="upload-image icon" />
				</label>
			</div>

			<div className="inputWrapper">
				<input
					type="text"
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							handleOnEnter(value.toString().replace(/,/g, ""));
						}
					}}
					value={value.toString().replace(/,/g, "")}
					onChange={handldeTextChange}
					placeholder="type message..."
				/>
			</div>
			{/* emoji  */}
			<div className="icons">
				<button
					className="sendBtn"
					onClick={() => {
						handleOnEnter(value.toString().replace(/,/g, ""));
						setImojiStyle({ display: "none" });
					}}
				>
					<MdSend className="sendIcon icon" />
				</button>
			</div>
		</div>
	);
};

export default Input;
