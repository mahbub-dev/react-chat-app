import React, { useState } from "react";
import { ConfirmEmail, SendConfirmCode } from "../../Api Request/authRequest";
import { useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
const VerifyEmail = () => {
	const navigate = useNavigate()
	const location = useLocation().search
	const email = new URLSearchParams(location).get('email')
	const [code, setCode] = useState("");
	const [err, setErr] = useState("");
	// confirm reset code request

	const confirmResetCode = async (e) => {
		e.preventDefault()
		try {
			const res = await ApiRequest.post(
				`auth/confirm/?email=${email}&code=${code}`
			);
			localStorage.setItem("token", res.data);
			navigate('/auth/setpassword')
		} catch (error) {
			console.log(error.response.data);
			setCode("");
			setErr(error.response?.data);
		}
	}



	//  resend confirm code
	const resendCode = () => {
		SendConfirmCode(email, (res) => {
			if (res.status === 200) {
				setErr("new code has been sent");
			}
		});
	};

	return (
		<div>
			<form onSubmit={confirmResetCode}>
				<p>
					An email has been sent to {email}
				</p>
				<br />
				<input
					required
					type="text"
					placeholder={"Enter the code"}
					value={code}
					onChange={(e) => {
						setCode(e.target.value);
						setErr("");
					}}
				/>
				<br /> <br />
				{err && <p>{err}</p>} <br />
				<span onClick={resendCode}>Resend</span> <br /> <br />
				<button type="submit">Confirm</button>
			</form>
		</div>
	);
};

export default VerifyEmail;
