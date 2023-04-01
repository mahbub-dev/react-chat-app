import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../../socketContext";
import { SlOptions } from "react-icons/sl";
import { optionHide } from '../../../../Utils/functions'
import "./user.scss";
import { useGlobalContext } from "../../../../context";
import { format } from 'timeago.js'
import ApiRequest from "../../../../Api Request/apiRequest";

function User({ item, itemArray }) {
	const { OpenUserDetails } = useGlobalContext();
	const [openOption, setOpenOption] = useState(false);
	const { onlineUsers } = useSocket()
	const timeFormat = format(item?.lastSms?.createdAt).split(' ')
	const clickRef = useRef();
	let isOnline = false;
	onlineUsers.forEach((i) => {
		i.userId === item?._id && (isOnline = i?.userId);
	});

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};

	}, []);

	function handleClickOutside(event) {
		// Check if the target element of the click event is outside of the component
		if (clickRef.current && !clickRef.current.contains(event.target)) {
			clickRef.current.style.display = 'none'
			setOpenOption(false)
		}
	}

	const handleOptionClick = (e) => {
		e.stopPropagation()
		optionHide(itemArray.map(i => i._id).filter(i => i !== item._id))
		if (!openOption) {
			clickRef.current.style.display = 'flex'
			setOpenOption(true)
		} else {
			clickRef.current.style.display = 'none'
			setOpenOption(false)
		}
	}

	const handleDelConversation = async () => {
		try {
			await ApiRequest.delete(`conversation/${item.convId}`)
			localStorage.removeItem('convId')
			localStorage.removeItem('receiverId')
			window.location.reload()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>

			<div className="user">
				<div className="img">
					<img src={item?.profilePicture} alt="img" />
					<div className={isOnline === item?._id ? "active" : ""}></div>
				</div>
				<div className="name">
					<h4 style={{ fontWeight: item?.lastSms?.isSeen ? "bold" : "500", }}>
						{item?.username}
					</h4>
					<div className="lastSmsAndTime">
						<p style={{ fontWeight: !item?.lastSms?.seenBy.includes(localStorage.getItem('userId')) > 0 ? "bold" : "initial", }}>
							{item?.lastSms ? item.lastSms?.text?.length < 25 ? item.lastSms?.text : item?.lastSms?.text?.slice(0, 25) + '...' : 'Say Assalamualaikum'}
						</p>
						{item?.lastSms && <p> {timeFormat.includes('just') ? 'Just now' : timeFormat[0] + timeFormat[1].slice(0, 1)}</p>}
					</div>
				</div>

				{/* user option  */}
				<button className="option-btn  opBtn" style={{ display: openOption ? 'flex' : '' }} onClick={handleOptionClick}>
					<SlOptions className="opBtn" />
				</button>


				<div ref={clickRef} id={item._id} className="userOption">
					<button onClick={(e) => { e.stopPropagation(); OpenUserDetails(item) }}>View profile</button>
					<button onClick={(e) => { e.stopPropagation(); handleDelConversation() }}>Delete chat</button>
				</div>
			</div>
		</>
	);
}

export default User;
