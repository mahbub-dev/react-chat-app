import "./active.scss";
import { useGlobalContext } from "../../context";


const Active = ({ id, isOnline }) => {
	return (
		<div
			className="active"
			style={{ display: isOnline ? "block" : "none" }}
		></div>
	);
};

export default Active;
