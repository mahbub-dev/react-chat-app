import { io } from "socket.io-client";
import { useState, createContext, useContext, useEffect } from "react";
import { updateUser } from "./Api Request/userRequest";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "./context";
const SocketContext = createContext();
const SocketProvider = ({ children }) => {
	const { userList, setUserList } = useGlobalContext();
	const friendId = useLocation().pathname.split("/")[2];
	const socketInitait = io(process.env.SOCKET_SERVER, { autoConnect: false });
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
	return (
		<SocketContext.Provider
			value={{
				onlineUsers,
				// setMessage,
				// message,
				socket,
				typingStatus,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
export const useSocket = () => useContext(SocketContext);
