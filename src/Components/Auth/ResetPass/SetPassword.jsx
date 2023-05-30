import React, { useState } from "react";
import ApiRequest from "../../../Api Request/apiRequest";

import { useNavigate } from "react-router-dom";
const SetPassword = ({ handleModals }) => {
	const navigate = useNavigate();
	const [err, setErr] = useState("");
	const [isLoading, setIsLoading] = useState(false)
	const [type, setType] = useState("password");
	const [password, setPassword] = useState({
		pass: "",
		confirmPass: "",
	});

	const handleChange = (e) => {
		setPassword((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	// set new password request
	const setNewPassRequest = async () => {
		try {
			if (
				password.pass.length > 4 &&
				password.pass === password.confirmPass
			) {
				// create custom request header
				const options = {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
						"Content-Type": "application/json",
					},
				};
				// create request here
				setIsLoading(true)
				await ApiRequest.post(
					`user/passreset/`,
					{ password: password.pass },
					options
				);

				localStorage.removeItem("token");
				navigate("/auth");
			} else alert("Confirm password must be same");
		} catch (error) {
			console.log(error.response);
			setIsLoading(false)
			setErr(error?.response?.data?.message);
			if (error.response.status === 401) {
				alert("Your session has expiered.try again");
				localStorage.removeItem("token");
			}
		}
	};
	return (
		<div className="basic-form">
			<div>
				<h1>Set New Password</h1>
				<input
					placeholder={"New password"}
					name="pass"
					onMouseEnter={(e) => setType("text")}
					onMouseLeave={() => setType("password")}
					type={type}
					value={password.pass}
					onChange={handleChange}
				/>
				<input
					type={type}
					onMouseEnter={(e) => setType("text")}
					onMouseLeave={() => setType("password")}
					placeholder={"Confirm password"}
					name="confirmPass"
					value={password.confirmPass}
					onChange={handleChange}
				/>
				{err && <p>sorry!Reseting proccess failed</p>}
				<button className="basic-btn" onClick={setNewPassRequest}>{isLoading?"Loading":'Submit'}</button>
			</div>
		</div>
	);
};

export default SetPassword;
