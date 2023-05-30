import { Navigate, Outlet } from "react-router-dom";
import "./auth.scss";

const Auth = () => {
	if (localStorage.getItem('userId')) {
		return <Navigate to={`/t/${localStorage.getItem('convId')}`} />
	}
	return (
		<div className="auth">
			<Outlet />
		</div>
	);
};

export default Auth;
