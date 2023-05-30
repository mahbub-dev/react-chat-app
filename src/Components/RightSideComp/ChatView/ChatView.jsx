/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../../context";
import Loading from "../../Loading/Loading";
import GroupsOfSms from "../Message/GroupsOfSms";
import "./chatview.scss";

const ChatView = ({ messages, currentChat, isMessageNotFound, getMessage }) => {
	const scrollRef = useRef()
	const loadScroll = useRef()
	const convRef = useRef()
	const loadStateRef = useRef(100)
	const { conversation, participant } = useGlobalContext()
	useEffect(() => {
		convRef.current = { convId: conversation._id, totalMessages: conversation.totalMessages }
		scrollRef?.current?.scrollTo({
			top: scrollRef?.current?.scrollHeight,
		});
		loadScroll.current = scrollRef?.current?.scrollHeight
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
	const handleMessageLoading = (e) => {
		const ref = { ...scrollRef }
		scrollRef.current = null
		if (loadStateRef.current > convRef?.current?.totalMessages) {
			loadStateRef.current = convRef?.current?.totalMessages
		}
		getMessage(convRef.current.convId, loadStateRef.current)
		if (loadStateRef.current !== convRef?.current?.totalMessages) {
			loadStateRef.current += 50
		}
		return setTimeout(() => scrollRef.current = ref.current, 1000)()
	}

console.log()
	return (
		<div
			className="chatView"
			ref={scrollRef}
		>
			{messages?.length > 0 && <div className="particiapants">
				<img width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} src={participant?.profilePicture} alt="" />
				<h5>{participant?.username}</h5>
			</div>}

			<button style={{ display: `${(loadStateRef.current === convRef?.current?.totalMessages || convRef?.current?.totalMessages < 50) ? 'none' : 'initial'}` }} className="basic-btn" onClick={(handleMessageLoading)}>Load Previous</button>
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
