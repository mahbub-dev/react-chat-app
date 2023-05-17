import { useState } from "react";
import { useGlobalContext } from "../../../context";
import "./Message.scss";
import SmsOption from "./SmsOption";

function Message({ currentChat, message }) {
	const { handleModals, OpenUploadImage, lastSeen, participant } = useGlobalContext();

	const [showTime, setShowTime] = useState('none')
	const getRepliedName = (smsId, repSmsId) => {
		let text = ''
		if (smsId === localStorage.getItem('userId')) {
			text = 'You replied to'
		} else {
			text = participant.username.split(' ')[1] + ' replied to'
		}
		if (repSmsId === localStorage.getItem('userId')) {
			smsId === localStorage.getItem('userId') ? text += ' yourself' : text += ' you'

		} else text += " " + participant?.username.split(' ')[1]
		return text
	}
	return (
		<>
			<div id={message?.sender === localStorage.getItem('userId') ? "own" : "other"} className="messages">
				<div className="tooltip" style={{ display: showTime }}>
					{new Date(message.createdAt).toLocaleTimeString()}
				</div>
				<SmsOption message={message} />
				<div className="sms-wrapper" >
					{message?.replyRef &&
						<div className="repliedRef">
							<span>
								{getRepliedName(message?.sender, message.replyRef.sender)}
							</span>
							<span className="repliedSms">
								{message?.replyRef?.text}
							</span>
						</div>}
					<div style={{ display: "flex" }}>
						<img className="profileImg" title={participant?.username} src={participant?.profilePicture} alt="" />
						<div className="sms-wrapper">
							{message?.text !== "" &&
								<p onMouseEnter={(e) => { setShowTime('block') }} onMouseLeave={(e) => { setShowTime('none') }}>
									{message?.text}
								</p>}

							{message.react && <span className="showReact"><img src={message.react} alt="react" /></span>}

							{/* images  render*/}
							{message?.attachment?.fileType === 'images' &&
								<div>
									{message?.attachment?.links.map((img, index) => (
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
								</div>
							}

							{/* pdf render */}
							{message?.attachment?.fileType === 'pdf' &&
								<div>
									{message?.attachment?.links?.map((i, ind) => (
										<a href={i} key={ind} onClick={(e) => {
											e.preventDefault();
											fetch(i)
												.then(response => response.blob())
												.then(blob => {
													const url = window.URL.createObjectURL(
														new Blob([blob]),
													);
													const link = document.createElement('a');
													link.href = url;
													link.setAttribute('download', `${ind}.pdf`);
													document.body.appendChild(link);
													link.click();
													document.body.removeChild(link);
												});
										}}>
											<img src="https://www.svgrepo.com/show/484943/pdf-file.svg" width={'40px'} alt="pdf" />
										</a>
									))
									}
								</div>
							}


							{/* audio file render  */}
							{
								message?.attachment?.fileType === 'audios' &&
								<div className="audio">
									{message?.attachment?.links.map((i, ind) => (
										<audio key={ind} controls width={'250px'} src={i}></audio>
									))}
								</div>
							}

							{/* video file render  */}
							{
								message?.attachment?.fileType === 'videos' &&
								<div className="vedio">
									{message?.attachment?.links?.map((i, ind) => (
										<video key={ind} controls width={'250px'} src={i}></video>
									))}
								</div>
							}




						</div>
					</div>
				</div>

				{lastSeen?._id === message?._id && (
					<img
						src={participant?.profilePicture}
						alt="seen"
						className="seen"
						title={`seen by ${participant?.username}`}
					/>
				)}
			</div>

		</>
	);
}

export default Message;
