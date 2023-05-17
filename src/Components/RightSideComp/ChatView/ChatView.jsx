/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../../context";
import GroupsOfSms from "../Message/GroupsOfSms";
import "./chatview.scss";
import Loading from "../../Loading/Loading";

const ChatView = ({ messages, currentChat, isMessageNotFound, getMessage }) => {
	const scrollRef = useRef()
	const convRef = useRef()
	const loadStateRef = useRef(100)
	const { conversation, participant } = useGlobalContext()
	useEffect(() => {
		convRef.current = { convId: conversation._id, totalMessages: conversation.totalMessages }
		scrollRef?.current?.scrollTo({
			top: scrollRef?.current?.scrollHeight,
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
	useEffect(() => {
		const handleMessageLoading = (e) => {
			if (e.target.scrollTop <= 100) {
				scrollRef.current = null
				if (loadStateRef.current > convRef?.current?.totalMessages) {
					loadStateRef.current = convRef?.current?.totalMessages
				}
				getMessage(convRef.current.convId, loadStateRef.current)
				if (loadStateRef.current !== convRef?.current?.totalMessages) {
					e.target.scrollTop = 500
					loadStateRef.current += 50
				}
			}
		}
		const timer = setTimeout(() => {
			scrollRef.current.addEventListener('scroll', handleMessageLoading);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	// console.log(`loadState:${loadStateRef.current},messageLentgh:${messages.length}`)
	return (
		<div
			className="chatView"
			ref={scrollRef}
		// onScroll={loadState !== conversation?.totalMessages ? handleMessageLoading : undefined}
		>
			{messages?.length > 0 && <div className="particiapants">
				<img width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} src={participant?.profilePicture} alt="" />
				<h5>{participant?.username}</h5>
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
