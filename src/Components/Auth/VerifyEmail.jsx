import React, { useState } from "react";
import { ConfirmEmail, SendConfirmCode } from "../../Api Request/authRequest";
const VerifyEmail = ({ classname, setIsConfirm }) => {
	const [code, setCode] = useState("");
	const [err, setErr] = useState("");
	// confirm reset code request
	const confirmResetCode = async () => {
		ConfirmEmail(code, (res) => {
			if (res.status === 200) {
				localStorage.setItem("token", res.data);
				setIsConfirm(true);
				localStorage.removeItem("confirmEmail");
			} else {
				console.log(res.data);
				setCode("");
				setErr(res?.data);
			}
		});
	};

	//  resend confirm code
	const resendCode = () => {
		const email = localStorage.getItem("confirmEmail");
		SendConfirmCode(email, (res) => {
			if (res.status === 200) {
				setErr("new code has been sent");
			}
		});
	};

	return (
		<div className={classname}>
			<p>
				an email has been sent to {localStorage.getItem("confirmEmail")}
			</p>
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
			{err && <p>{err}</p>}
			<span onClick={resendCode}>resend</span>
			<button type="button" onClick={confirmResetCode}>
				Confirm
			</button>
		</div>
	);
};

export default VerifyEmail;
