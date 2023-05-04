import "./resetPass.scss";
import { Outlet } from "react-router-dom";

const Reset = () => {
	return (
		<div className="resetPass">
			<div className="compWrapper">
				<div
					className="innerCompWrapper"
				>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Reset;
