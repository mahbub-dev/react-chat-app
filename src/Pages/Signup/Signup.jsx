import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Api Request/userRequest";
import "../Login/login.scss";
import "./Signup.scss";
function Signup() {
	const [err, setError] = useState("");
	const [isShow, setIsShow] = useState(false);
	const [style, setStyle] = useState("password");
	const [signupData, setSignupData] = useState({
		username: "",
		email: "",
		phone: "",
		confirmPassword: "",
		password: "",
	});
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
	const handleChange = (e) => {
		setSignupData((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
	const handleSignup = (e) => {
		e.preventDefault();
		if (signupData.password === signupData.confirmPassword) {
			createUser(signupData, (res) => {
				if (res._id) {
					navigate("/signup/confirm");
				} else {
					console.log(res);
				}
			});
		} else {
			alert("confirm password is not same as password");
		}
	};
	return (
		<div className="login">
			<div className="login-wrapper signup-wrapper">
				<h1>Chat App</h1>
				<form onSubmit={handleSignup}>
					<label htmlFor="name">Name</label>
					<input
						name="username"
						required
						type="text"
						value={signupData.username}
						onChange={handleChange}
					/>
					<label htmlFor="email">Email</label>
					<input
						name="email"
						required
						type="email"
						value={signupData.email}
						onChange={handleChange}
					/>
					<label htmlFor="phone">Phone</label>
					<input
						name="phone"
						type="text"
						value={signupData.phone}
						onChange={handleChange}
					/>

					<label htmlFor="password">Password</label>
					<span className="password_input">
						<input
							name="password"
							required
							type={style}
							value={signupData.password}
							onChange={handleChange}
						/>
						<span className="showhide" onClick={handleShow}>
							{" "}
							{isShow ? "hide" : "show"}
						</span>
					</span>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type={"password"}
						required
						name="confirmPassword"
						value={signupData.confirmPassword}
						onChange={handleChange}
					/>
					<span className="errShow">{err ? err : null}</span>
					<button type="submit">Singup</button>
				</form>
				<a href="/login">I already have an Account</a>
			</div>
		</div>
	);
}

export default Signup;
