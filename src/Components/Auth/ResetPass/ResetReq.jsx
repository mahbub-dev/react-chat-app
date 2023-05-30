import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SendConfirmCode } from "../../../Api Request/authRequest";
const ResetReq = () => {
	const location = useLocation()
	const [inputVal, setInputVal] = useState("");
	const [isLoading, setIsLoading] = useState(false)
	const [err, setErr] = useState("");
	const navigate = useNavigate()
	// send reset request
	const sendResetRequest = () => {
		setIsLoading(true)
		SendConfirmCode(inputVal, (res) => {
			if (res.status === 200) {
				setInputVal("");
				navigate(`/auth/confirm/?email=${inputVal}&for=reset`, { state: { from: location } })
			} else {
				setErr(res?.data);
				setIsLoading(false)
			}
		});
	};

	return (
		<div className="basic-form">
			<div>
				<h1>Reset Password</h1>
				<input
					required
					type={"email"}
					placeholder={"Enter your email"}
					value={inputVal}
					onChange={(e) => {
						setInputVal(e.target.value);
						setErr("");
					}}
				/>
				{err && <p>{err}</p>}
				<button
				className="basic-btn"
					type="button"
					onClick={sendResetRequest}
					disabled={inputVal.length < 5}
				>
					{isLoading ? "Loading..." : "Reset"}
				</button>
			</div>
		</div>
	);
};

export default ResetReq;
