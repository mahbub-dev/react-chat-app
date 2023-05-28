import React, { useState } from "react";
import { SendConfirmCode } from "../../Api Request/authRequest";
import { useLocation, useNavigate } from "react-router-dom";
import ApiRequest from "../../Api Request/apiRequest";
const VerifyEmail = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const search = new URLSearchParams(location.search)
	const email = search.get('email')
	const verifyFor = search.get('for')
	// console.log(verifyFor)
	const [code, setCode] = useState("");
	const [err, setErr] = useState("");
	// confirm reset code request
	const confirmResetCode = async (e) => {
		e.preventDefault()
		if (verifyFor === 'reset') {
			console.log(verifyFor)
			navigate(`/auth/reset/setpassword`)
		} else navigate('/auth')
		try {
			const res = await ApiRequest.post(
				`auth/confirm/?email=${email}&code=${code}&for=${verifyFor}`
			);

			localStorage.setItem("token", res.data);
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
				setErr("New code has been sent");
			}
		});
	};

	return (
		<div className="basic-form">
			<div>
				<h1>Confirm Email</h1>
				<form onSubmit={confirmResetCode}>
					<p>
						An email has been sent to <b>{email}</b>
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

					{err && <p>{err}</p>} <br />
					<span onClick={resendCode} style={{ marginRight: '5px', color: 'blueviolet', cursor: 'pointer' }}>Resend</span>
					<button className="basic-btn" type="submit">Confirm</button>
				</form>
			</div>
		</div>
	);
};

export default VerifyEmail;
