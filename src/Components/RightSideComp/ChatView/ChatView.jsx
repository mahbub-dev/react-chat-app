/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../../context";
import GroupsOfSms from "../Message/GroupsOfSms";
import "./chatview.scss";
import Loading from "../../Loading/Loading";

const ChatView = ({ messages, currentChat, isMessageNotFound }) => {
	const scrollRef = useRef()
	const { conversation } = useGlobalContext()
	useEffect(() => {
		scrollRef.current.scrollBy(0, scrollRef.current.scrollHeight);
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
	return (
		<div
			className="chatView"
			ref={scrollRef}
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
