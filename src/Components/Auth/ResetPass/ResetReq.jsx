import React, { useState } from "react";
import { SendConfirmCode } from "../../../Api Request/authRequest";
import { useNavigate } from "react-router-dom";
const ResetReq = ({ setStyle }) => {
	const [inputVal, setInputVal] = useState("");
	const [err, setErr] = useState("");
	const navigate = useNavigate()
	// send reset request
	const sendResetRequest = () => {
		SendConfirmCode(inputVal, (res) => {
			if (res.status === 200) {
				setInputVal("");
				navigate(`/auth/reset/confirm/?email=${inputVal}`)
			} else {
				setErr(res?.data);
			}
		});
	};

	return (
		<div className="resetReq">
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
				type="button"
				onClick={sendResetRequest}
				disabled={inputVal.length < 5}
			>
				Reset
			</button>
		</div>
	);
};

export default ResetReq;
