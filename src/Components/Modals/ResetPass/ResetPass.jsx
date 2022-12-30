import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import ApiRequest from "../../../Api Request/apiRequest";
import { PasswordInput } from "../../../Components/Modals/Profile/ChangePass/ChangePass";
import { useGlobalContext } from "../../../context";
import "./resetPass.scss";

const ResetPass = () => {
	const { handleModals } = useGlobalContext();
	const [inputVal, setInputVal] = useState("");
	const [code, setCode] = useState("");
	const [err, setErr] = useState("");
	const [password, setPassword] = useState({
		pass: "",
		confirmPass: "",
	});

	const handleChange = (e) => {
		setPassword((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
	const handlePassReset = async () => {
		if (code) {
			if (code === inputVal) {
				setCode("");
				setInputVal("getNewPass");
			} else {
				setErr("doesn't match");
			}
		} else {
			const res = await ApiRequest.post(
				`auth/resetpassword/?email=${inputVal}&sendmail=true`
			);
			console.log(res);
			if (res?.data?.token) {
				setInputVal("");
				setCode(res?.data?.token);
				localStorage.setItem("resetEmail", inputVal);
			}
		}
	};

	const handleUpdate = async () => {
		const email = localStorage.getItem("resetEmail");
		if (
			password.pass.length > 4 &&
			password.pass === password.confirmPass
		) {
			const res = await ApiRequest.post(
				"auth/resetpassword/?sendemail='false'",
				{
					email,
					password: password.pass,
				}
			);
			if (res?.data === "success") {
				setInputVal("success");
				setTimeout(() => {
					setInputVal("");
					setCode("");
					setPassword("");
					handleModals(false, "resetPass");
				}, 3000);
			} else {
				setInputVal("failed");
			}
		}
	};
	return (
		<div className="resetPass">
			<div className="modalsWrapper">
				<TiDelete
					className="close"
					onClick={() => handleModals(false, "resetPass")}
				/>
				{inputVal === "success" ? (
					<p>Reset Successful</p>
				) : (
					<div className="inputBox">
						{inputVal === "getNewPass" ? (
							<>
								{" "}
								<PasswordInput
									placeholder={"New password"}
									name="pass"
									value={password.pass}
									handleChange={handleChange}
								/>
								<PasswordInput
									placeholder={"Confirm password"}
									name="confirmPass"
									value={password.confirmPass}
									handleChange={handleChange}
								/>
								{inputVal === "failed" && (
									<p>sorry!Reseting proccess failed</p>
								)}
								<button onClick={handleUpdate}>Submit</button>
							</>
						) : (
							<>
								{" "}
								<input
									required
									type={code ? "text" : "email"}
									placeholder={code ? "Enter code" : "Email"}
									value={inputVal}
									onChange={(e) => {
										setInputVal(e.target.value);
									}}
								/>
								{err === "doesn't match" && <p>{err}</p>}
								<button type="button" onClick={handlePassReset}>
									{code ? "Confirm" : "Reset"}
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ResetPass;
