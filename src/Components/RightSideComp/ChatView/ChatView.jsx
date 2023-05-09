/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../context";
import GroupsOfSms from "../Message/GroupsOfSms";
import "./chatview.scss";
import Loading from "../../Loading/Loading";

const ChatView = ({ messages, currentChat, isMessageNotFound, getMessage }) => {
	const scrollRef = useRef()
	const loadRef = useRef(false)
	const [loadState, setLoadState] = useState(60)
	const { conversation } = useGlobalContext()

	useEffect(() => {
		scrollRef.current.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth",
		  });
	}, [conversation]);


	const groupedMessages = {};
	messages.forEach(message => {
		const date = new Date(message.createdAt).toDateString();
		if (groupedMessages[date]) {
			groupedMessages[date].push(message);
		} else {
			groupedMessages[date] = [message];
		}
	});
	// scrollRef.current = null
	const handleMessageLoading = (e) => {
		if (e.target.scrollTop <= 100) {
			getMessage(conversation._id, loadState)
			setLoadState(p => p + 30)
			e.target.scrollTop = 500
			// scrollRef.current = null
		}
	}
	useEffect(() => {
		loadRef.current = true
	}, [])

	return (
		<div
			className="chatView"
			ref={scrollRef}
			onScroll={loadRef.current ? handleMessageLoading : undefined}
		>
			{messages?.length > 0 && <div className="particiapants">
				<img width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} src={currentChat[0]?.profilePicture} alt="" />
				<h5>{currentChat[0]?.username}</h5>
			</div>}
			{messages?.length > 0 ? (
				Object.keys(groupedMessages)?.map((m, i, arr) => {
					return (
						<div key={m} >
							<GroupsOfSms
								messages={groupedMessages[m]}
								index={i}
								currentChat={currentChat}
								array={arr}
							/>
						</div>
					);
				})
			) : (
				isMessageNotFound.current ? <p>Say Assalamualaikum to start chat </p> : <Loading />
			)}
		</div>
	);
};

export default ChatView;
