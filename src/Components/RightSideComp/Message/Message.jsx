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
								<div>
									{message?.images.map((img, index) => (
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


							{message?.pdf.length > 0 &&
								<div>
									{message?.pdf.map((i, ind) => (
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



							{
								message?.audios.length > 0 &&
								<div>
									{message?.audios.map((i, ind) => (
										<audio key={ind} controls width={'250px'} src={i}></audio>
									))}
								</div>
							}

							{
								message?.videos.length > 0 &&
								<div>
									{message?.videos.map((i, ind) => (
										<video key={ind} controls width={'250px'} src={i}></video>
									))}
								</div>
							}



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
