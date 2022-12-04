import React, { useState } from "react";
import { createUser } from "../../Api Request/userRequest";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import "./Signup.scss";
import "../Login/login.scss";
function Signup() {
	const [err, setError] = useState("");
	const [isShow, setIsShow] = useState(false);
	const [style, setStyle] = useState("password");
	const [signupData, setSignupData] = useState({});
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
		createUser(signupData, (res) => {
			if (res._id) {
				navigate('/')
			} else {
				console.log(res);
			}
		});
	};
	return (
		<div className="login">
			<div className="wrapper">
				<h1>Chat App</h1>
				<form onSubmit={handleSignup}>
					<label htmlFor="name">Name</label>
					<input
						name="username"
						type="text"
						placeholder="Name"
						value={signupData.name}
						onChange={handleChange}
					/>
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="email"
						placeholder="Email"
						value={signupData.email}
						onChange={handleChange}
					/>
					<label htmlFor="phone">Phone</label>
					<input
						name="phone"
						type="text"
						placeholder="Phone"
						value={signupData.phone}
						onChange={handleChange}
					/>

					<label htmlFor="password">Password</label>
					<span className="password_input">
						<input
							name="password"
							type={style}
							value={signupData.password}
							placeholder="Password"
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
						name="confirmPassword"
						value={signupData.confirmPassword}
						placeholder="Confirm Passoword"
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
