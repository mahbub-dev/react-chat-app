import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../../Api Request/authRequest";
import { useGlobalContext } from "../../../context";
import "./login.scss";
function Login({ setStyle: setNewStyle }) {
	const { setLoggedUser } = useGlobalContext();
	const [err, setError] = useState("");
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
		loginRequest({ loginId, password }, (res) => {
			if (res?.status === 200) {
				setLoggedUser(res?.data);
				navigate(`/home`);
				localStorage.setItem("sound", "yes");
				window.location.reload();
			} else if (res?.status === 403) {
				setNewStyle("-33.5");
				localStorage.setItem("confirmEmail", loginId);
			} else {
				setError(res.data);
			}
		});
	};
	return (
		<div className="login">
			<div className="login-wrapper">
				<h1>Chat App</h1>
				<form onSubmit={handleLogin}>
					<input
						id="email"
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
				<p>
					<a href="/auth/reset">Forget password</a>
				</p>
				<p
					onClick={() => {
						setNewStyle("-67");
						localStorage.setItem("auth", "signup");
					}}
				>
					Create a new Account
				</p>
			</div>
		</div>
	);
}

export default Login;
