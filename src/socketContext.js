import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const SocketContext = createContext();
const SocketProvider = ({ children }) => {
	const friendId = useLocation().pathname.split("/")[2];
	const socketInitait = io(
		process.env.REACT_APP_SOKECT_SERVER,
		{
			autoConnect: false,
		}
	);
	const [socket, setSocket] = useState(socketInitait);
	const [typingStatus, setTypingStatus] = useState({
		isTyping: false,
		sender: "",
	});
	const [onlineUsers, setOnlineUsers] = useState([]);
	const userId = localStorage.getItem("userId");
	useEffect(() => {
		const s = socket.connect();
		setSocket(s);
		socket?.emit("addUser", userId);
		socket?.on("getUsers", (users) => {
			setOnlineUsers(users.filter((i) => i.userId !== userId));
		});
	}, [userId, socket]);

	useEffect(() => {
		socket.on("getTypingStatus", (data) => {
			setTypingStatus({
				isTyping: data?.isTyping,
				sender: data?.sender,
			});
		});
	}, [socket, friendId]);

	const sendDataToSocketServer = (data, isDeleted = false) => {
		socket?.emit("sendMessage", {
			message: data,
			isDeleted,
			receiverId: localStorage.getItem("receiverId"),
			senderId: localStorage.getItem("userId"),
			convType: localStorage.getItem("convType"),
		});
	};

	const sendSeenStatusToSocketServer = (data) => {
		socket.emit("isSeen", {
			message: data,
			senderId: localStorage.getItem("userId"),
			receiverId: localStorage.getItem("receiverId"),
		});
	};

	const sendIsTypingStatusToSocketServer = (isTyping) => {
		let status = {
			isTyping,
			senderId: localStorage.getItem("userId"),
			receiverId: localStorage.getItem("receiverId"),
		};
		socket.emit("sendTypingStatus", status);
	};
	return (
		<SocketContext.Provider
			value={{
				onlineUsers,
				socket,
				typingStatus,
				sendDataToSocketServer,
				sendSeenStatusToSocketServer,
				sendIsTypingStatusToSocketServer,
			}}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
