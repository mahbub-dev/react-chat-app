import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../../Api Request/authRequest";
import "./confirm.scss";

const Confirm = () => {
	const location = useLocation().search.split("?")[1];
	const [err, setError] = useState(false);
	const [code, setCode] = useState("");
	const navigate = useNavigate();
	const [serverRes, setServerRes] = useState("");
	const handleConfirm = () => {
		confirmEmail(code, (res) => {
			if (res?.data === "confirmed") {
				setError(false);
				setServerRes(res?.data);
				setTimeout(() => {
					navigate("/login");
					localStorage.removeItem("signupEmail");
				}, 5000);
			} else {
				setError(true);
			}
		});
	};
	useEffect(() => {
		location &&
			setTimeout(() => {
				navigate("/login");
				localStorage.removeItem("signupEmail");
			}, 5000);
	});
	return (
		<>
			{localStorage.getItem("signupEmail") ? (
				<div className="confirm-email">
					<div
						className="inputWrapper"
						style={{
							display: serverRes || location ? "none" : "flex",
						}}
					>
						<p>
							A code has been sent to your email address from
							<b> hacckerss071@gmail.com</b>
						</p>
						<input
							type="text"
							className="confirmInput"
							placeholder="Enter code"
							onChange={(e) => setCode(e.target.value)}
							onKeyPress={(e) => {
								e.key = "Enter" && handleConfirm();
							}}
							value={code}
						/>
						<button
							onClick={handleConfirm}
							disabled={code.length < 4 ? true : false}
						>
							Confirm
						</button>
						<p style={{ display: err ? "initial" : "none" }}>
							Code doesn't match
						</p>
					</div>

					<div
						className="confirmRes "
						style={{
							display: serverRes || location ? "flex" : "none",
						}}
					>
						<p>
							{" "}
							Congratulation! Your email verification is
							successfull
						</p>
						<p>You will be redirect after few second ... </p>
					</div>
				</div>
			) : (
				<Navigate to={"/home"} />
			)}
		</>
	);
};

export default Confirm;
