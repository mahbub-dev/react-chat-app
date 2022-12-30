import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import ApiRequest from "../../../../Api Request/apiRequest";
import { updateUser } from "../../../../Api Request/userRequest";
import { useGlobalContext } from "../../../../context";
import { handleProfilesModal } from "../index";
import "./changeEmail.scss";

function ChangeEmail() {
	const { handleModals, setLoggedUser } = useGlobalContext();
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [inputVal, setInputVal] = useState("");
	const [password, setPassword] = useState("");
	const [checkPass, setCheckPass] = useState("");
	const [finalRes, setFinalRes] = useState("");
	const [code, setCode] = useState("");
	const [randomCode, setRandomCode] = useState("");
	const handleCheckPass = async () => {
		const res = await ApiRequest.post(
			`auth/emailverification/?email=${inputVal}&checkPass='true'`,
			{ password }
		);
		res?.data?.token
			? setRandomCode(res?.data?.token)
			: setCheckPass("WrongPass");
	};

	const handleConfirm = async () => {
		if (code === randomCode) {
			updateUser({ email: inputVal }, (res) => {
				if (res) {
					setFinalRes("success");
					setRandomCode("");
					setPassword("");
					setInputVal("");
					setLoggedUser(res);
					setTimeout(() => {
						handleModals(false, "change-email");
						setFinalRes("");
					}, 4000);
				}
			});
		} else {
			setFinalRes("doesn't match");
		}
	};

	useEffect(() => {
		const hangleEmailEdit = async () => {
			const res = await ApiRequest.post(
				`auth/emailverification/?email=${inputVal}`
			);
			if (inputVal.length > 3 && inputVal.includes("@")) {
				setIsValidEmail(res?.data);
			} else {
				setIsValidEmail(false);
			}
		};
		hangleEmailEdit();
	}, [inputVal]);

	useEffect(() => {
		checkPass &&
			setTimeout(() => {
				setCheckPass("");
			}, 5000);
	}, [checkPass, setCheckPass]);

	return (
		<div className="change-email">
			<div className="modalsWrapper">
				<TiDelete
					className="close"
					onClick={() => handleProfilesModal(false, "change-email")}
				/>
				{finalRes === "success" ? (
					<p>Your email has been changed</p>
				) : (
					<>
						<div
							className="inputBox"
							style={{
								display: randomCode ? "none" : "flex",
							}}
						>
							{isValidEmail ? (
								<AiFillCheckCircle className="checkMark" />
							) : (
								<MdOutlineError className="checkMark" style={{color:'red'}} />
							)}
							<input
								type="email"
								required
								placeholder="New email"
								value={inputVal}
								onChange={(e) => {
									setInputVal(e.target.value);
								}}
							/>
							<input
								readOnly={!isValidEmail}
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							{checkPass === "WrongPass" && <p>Wrong Password</p>}
							<button
								disabled={password ? false : true}
								onClick={handleCheckPass}
							>
								Submit
							</button>
						</div>
						<div
							className="codeBox"
							style={{
								display: randomCode ? "flex" : "none",
							}}
						>
							<p>
								We have sent a code to your email.Check your
								inbox
							</p>
							<input
								type="text"
								value={code}
								placeholder="Enter code"
								onChange={(e) => setCode(e.target.value)}
							/>
							{finalRes === "doesn't match" && (
								<p>Code doesn't match</p>
							)}
							<button onClick={handleConfirm}>Confirm</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ChangeEmail;
