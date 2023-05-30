import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUser } from "../../../Api Request/userRequest";
import "../Login/login.scss";
import "./Signup.scss";
function Signup() {
	const location = useLocation()
	const navigate = useNavigate()
	useEffect(() => {
		if (location.state?.from === '/auth/confirm/') {
			navigate('/auth/login')
		}
	}, [location, navigate])
	console.log(location.state?.from)
	const [err, setError] = useState("");
	const [isShow, setIsShow] = useState(false);
	const [style, setStyle] = useState("password");
	const [isLoading, setIsLoading] = useState(false)
	const [signupData, setSignupData] = useState({
		username: "",
		email: "",
		phone: "",
		confirmPassword: "",
		password: "",
	});
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
			setIsLoading(true)
			createUser(signupData, (res) => {
				if (res.status === 201) {
					navigate(`/auth/confirm/?email=${signupData.email}&for='signup'`, { state: { from: location } })
				} else {
					setIsLoading(false)
					setError(res?.data);
					console.log(res);
				}
			});
		} else {
			alert("Confirm password is not same as password");
		}

	};
	return (
		<div className="signup login basic-form">
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
					<button className="basic-btn" type="submit">{isLoading ? 'Loading...' : 'Signup'}</button>
				</form>
				<p>
					<Link to={'/auth'}>
						I already have an Account
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Signup;
