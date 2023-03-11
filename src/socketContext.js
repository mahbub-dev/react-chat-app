import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const SocketContext = createContext();
const SocketProvider = ({ children }) => {
	const localSocketServer = "ws://localhost:3001";
	const cloudSocketServer = "wss://socket-server-dtrx.onrender.com";
	const friendId = useLocation().pathname.split("/")[2];
	const socketInitait = io(localSocketServer, { autoConnect: false });
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

	
	const sendDataToSocketServer = (data) => {
		socket?.emit("sendMessage", {
			message: data,
			receiverId: localStorage.getItem("receiverId"),
			senderId: localStorage.getItem("userId"),
			convType: localStorage.getItem("convType"),
		});
	};
	return (
		<SocketContext.Provider
			value={{
				onlineUsers,
				socket,
				typingStatus,
				sendDataToSocketServer,
			}}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
