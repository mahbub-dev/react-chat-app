import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdOutlineError } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import ApiRequest from "../../../../Api Request/apiRequest";
import { useGlobalContext } from "../../../../context";
import { handleProfilesModal } from "../index";
import "./changeEmail.scss";

function ChangeEmail() {
	const { handleModals, setLoggedUser } = useGlobalContext();
	const [isValidEmail, setIsValidEmail] = useState(false);
	const [inputVal, setInputVal] = useState("");
	const [password, setPassword] = useState("");
	const [finalRes, setFinalRes] = useState("");
	const [code, setCode] = useState("");
	const [isCodeSent, setIsCodeSent] = useState(false);
	const [errorRes, setErrorRes] = useState('')
	const handleSendCode = async () => {
		try {
			await ApiRequest.post(
				`auth/sendcode/${inputVal}?id=${localStorage.getItem('userId')}`,
			);
			setIsCodeSent(true);
		} catch (error) {

		}
	};

	const handleConfirm = async () => {
		try {
			if (code && password) {
				const res = await ApiRequest.post(`/user/changemail`, { email: inputVal, code, password })
				setFinalRes("success");
				setIsCodeSent("");
				setPassword("");
				setInputVal("");
				setLoggedUser(res.data);
				setTimeout(() => {
					handleModals(false, "change-email");
					setFinalRes("");
				}, 4000);
			} else setErrorRes('please fill up the required field')
		} catch (error) {
			if (error?.response) {
				setErrorRes(error?.response?.data);
			}
		}
	};

	useEffect(() => {
		const hangleEmailEdit = async () => {
			try {
				if (inputVal.length > 3 && inputVal.includes("@")) {
					await ApiRequest.get(`auth/${inputVal}`);
					setIsValidEmail(true);
				} else {
					setIsValidEmail(false);
				}
			} catch (error) {
				setIsValidEmail(false);
			}
		};
		hangleEmailEdit();
	}, [inputVal]);

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
								display: isCodeSent ? "none" : "flex",
							}}
						>
							{isValidEmail ? (
								<AiFillCheckCircle
									className="checkMark"
									title="email is valid"
								/>
							) : (
								<MdOutlineError
									className="checkMark"
									style={{ color: "red" }}
									title="email is not valid"
								/>
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
							<button
								onClick={handleSendCode}
								type="button"
								disabled={!isValidEmail}
							>
								Submit
							</button>
						</div>


						<div
							className="codeBox"
							style={{
								display: isCodeSent ? "flex" : "none",
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
							<input
								type="password"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<p>{errorRes}</p>

							<button type="button" onClick={handleConfirm}>Confirm</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ChangeEmail;
