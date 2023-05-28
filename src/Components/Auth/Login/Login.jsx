import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginRequest } from "../../../Api Request/authRequest";
import { useGlobalContext } from "../../../context";
import "./login.scss";
function Login() {
	const location = useLocation()
	const { setLoggedUser } = useGlobalContext();
	const [err, setError] = useState("");
	const [isShow, setIsShow] = useState(false);
	const [style, setStyle] = useState("password");
	const [password, setPassword] = useState("");
	const [loginId, setLoginId] = useState("");
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate();
	const handleShow = () => {
		if (isShow) {
			setStyle("password");
			setIsShow(false);
		} else {
			setStyle("text");
			setIsShow(true);
		}
	};
	const handleLogin = (e) => {
		e.preventDefault();
		setLoading(true)
		loginRequest({ loginId, password }, (res) => {
			if (res?.status === 200) {
				setLoggedUser(res?.data);
				navigate(`/`);
				localStorage.setItem("sound", "yes");
				window.location.reload();
			} else if (res?.status === 403) {
				navigate(`/auth/confirm/?email=${loginId}&for='signup'`, { state: { from: location }, replace: true })
			} else {
				setError(res.data);
				setLoading(false)
			}
		});
	};
	return (
		<div className="login basic-form">
			<div className="login-wrapper">
				<h1>Chat App</h1>
				<form onSubmit={handleLogin}>
					<input
						id="email"
						type="text"
						placeholder="Email or phone"
						required
						value={loginId}
						onChange={(e) => setLoginId(e.target.value)}
					/>
					<span className="password_input">
						<input
							type={style}
							value={password}
							required
							placeholder="Passoword"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<span className="showhide" onClick={handleShow}>
							{" "}
							{isShow ? "hide" : "show"}
						</span>
					</span>
					<span className="errShow">{err ? err : null}</span>
					<button className="basic-btn" type="submit">{loading ? 'Please wait' : 'Login'}</button>
				</form>
				<p>
					<Link to="/auth/reset">Forget password</Link>
				</p>
				<p>
					<Link to={'/auth/signup'} >
						Create a new Account
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
