/* eslint-disable react-hooks/exhaustive-deps */
// import from module
// import from local
import "./Desktop.scss";
import Chat from "../../Chat/Chat";
import { UserList, Search, LoggedUser } from "../../../Components/index";

const Desktop = () => {
	return (
		<div className="desktop">
			<div className="leftside">
				<LoggedUser />
				<Search />
				<UserList />
			</div>

			{/* ************** right side************/}
			
				<Chat />
			
		</div>
	);
};

export default Desktop;
