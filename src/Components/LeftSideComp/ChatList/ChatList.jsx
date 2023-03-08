/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";
import { getUser } from "../../../Api Request/userRequest";
import { useGlobalContext } from "../../../context";
import { useSocket } from "../../../socketContext";
import Loading from "../../Loading/Loading";
import Search from "../Search/Search";
import User from "./User/User";

const ChatList = ({
	handleConversation,
}) => {
	const [chats, setChats] = useState([]);
	const [responseStatus, setResponseStatus] = useState(200);
	const [detectCurrentChat, setDetectCurrentChat] = useState(localStorage.getItem('convId'));
	const { unreadMessage, searchValue } = useGlobalContext();
	const userId = localStorage.getItem("userId");
	const removeDuplicat = unreadMessage.filter(
		(i, ind, arr) => arr.indexOf(i) === ind
	);
	
	useEffect(() => {
		const getConv = async () => {
			try {
				const res = await ApiRequest.get(`/conversation/?search=${searchValue}`);
				// console.log(res.data)
				setChats(res.data)
				setResponseStatus(res.status)
			} catch (error) {
				setResponseStatus(error?.response.status)
				console.log(error.response?.data);
			}
		};
		getConv()
	}, [searchValue]);

	return (
		<>

			<Search />
			{responseStatus === 200 ? (
				chats
					.sort(
						(a, b) =>
							b?.user?.lastSms.timestamps -
							a?.user?.lastSms.timestamps
					)
					.map((item, index, arr) => {
						return (
							<div
								onClick={() => { handleConversation(item.convId, item.convType); setDetectCurrentChat(item.convId) }}
								className="item"
								key={index}
								style={{ background: (detectCurrentChat === item.convId) ? '#F5F5F5' : 'initial' }}
							>
								<User
									item={item}
									itemArray={arr}
								/>
							</div>
						);
					})
			) : responseStatus !== 404 ? (
				<Loading />
			) : (
				"No data Found"
			)}
		</>
	);
};

export default ChatList;
