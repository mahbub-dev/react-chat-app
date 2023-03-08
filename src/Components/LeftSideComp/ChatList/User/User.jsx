import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../../socketContext";
import { SlOptions } from "react-icons/sl";
import { optionHide } from '../../../../Utils/functions'
import "./user.scss";
import { useGlobalContext } from "../../../../context";

function User({  item, itemArray }) {
	const { OpenUserDetails } = useGlobalContext();
	const [openOption, setOpenOption] = useState(false);
	const clickRef = useRef();
	// const item = {};
	// item.user = item;
	// const { onlineUsers } = useSocket();
	let isOnline = false;
	// onlineUsers &&
	// 	onlineUsers.forEach((i) => {
	// 		i.userId === item?.user?._id && (isOnline = i?.userId);
	// 	});
	// item.isOnline = isOnline;
	// 	item?.user?.lastSms?.sender !== localStorage.getItem("userId");
	let isSeen = false;

	useEffect(() => {
		// Add a click event listener to the document object
		document.addEventListener("click", handleClickOutside);
		// Remove the event listener when the component is unmounted
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

	const handleDelConversation = (convId)=>{

	}
	return (
		<>

			<div className="user">
				<div className="img">
					<img src={item?.profilePicture} alt="img" />
					<div className={isOnline === item?._id ? "active" : ""}></div>
				</div>
				<div className="name">
					<h4 style={{ fontWeight: isSeen && item?.totalUnseen > 0 ? "bold" : "500", }}>
						{item?.username}
					</h4>
					<div className="lastSmsAndTime">
						<p style={{ fontWeight: isSeen && item.totalUnseen > 0 ? "bold" : "initial", }}>
							{item?.lastSms ? item.lastSms?.text?.length < 25 ? item.lastSms?.text : item?.lastSms?.text?.slice(0, 25) + '...' : 'Say Assalamualaikum'}
						</p>
						<p>{item?.time}16h</p>
					</div>
				</div>
				{/* user option  */}
				<button className="option-btn  opBtn" style={{ display: openOption ? 'flex' : '' }} onClick={handleOptionClick}>
					<SlOptions className="opBtn" />
				</button>

				<div ref={clickRef} id={item._id} className="userOption">
					<button onClick={() => OpenUserDetails(item)}>View profile</button>
					<button onClick={() => handleDelConversation(item.id)}>Delete chat</button>
				</div>
			</div>
		</>
	);
}

export default User;
