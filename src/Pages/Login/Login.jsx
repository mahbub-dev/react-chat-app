import React, { useState } from "react";
import { loginRequest } from "../../Api Request/authRequest";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./login.scss";
function Login() {
	const { setLoggedUser } = useGlobalContext();
	const [ err, setError ] = useState("");
	const [isShow, setIsShow] = useState(false);
	const [style, setStyle] = useState("password");
	const [password, setPassword] = useState("");
	const [loginId, setLoginId] = useState("");
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
		loginRequest({ loginId, password }, (data) => {
			setLoggedUser(data.loginuser);
			if (data.token) {
				navigate("/");
				window.location.reload();
			} else {
				setError(data.response.data);
			}
		});
	};
	return (
		<div className="login">
			<div className="wrapper">
				<h1>Chat App</h1>
				<form onSubmit={handleLogin}>
					<input
						type="text"
						placeholder="Email or phone"
						value={loginId}
						onChange={(e) => setLoginId(e.target.value)}
					/>
					<span className="password_input">
						<input
							type={style}
							value={password}
							placeholder="Passoword"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<span className="showhide" onClick={handleShow}>
							{" "}
							{isShow ? "hide" : "show"}
						</span>
					</span>
					<span className="errShow">{err ? err : null}</span>
					<button type="submit">Login</button>
				</form>
				<a href="/signup">Create a new Account</a>
			</div>
		</div>
	);
}

export default Login;
