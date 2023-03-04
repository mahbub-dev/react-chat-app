import React, { useEffect, useState } from "react";
import { Signup, Login, VerifyEmail } from "../../Components/Auth";
import "./auth.scss";

const Auth = () => {
	const [style, setStyle] = useState("0");
	const [isConfirm, setIsConfirm] = useState(false);
	useEffect(() => {
		localStorage.getItem("auth") === "signup" && setStyle("-67");
		localStorage.getItem("confirmEmail") && setStyle("-33.5");
	}, []);
	useEffect(() => {
		isConfirm && setStyle("0") && localStorage.setItem('auth','login')
	}, [isConfirm]);
	return (
		<div className="auth">
			<div style={{ transform: `translateY(${style}%)` }}>
				<Login setStyle={setStyle} />
				<div
					className="confirm"
					style={{
						opacity: `${
							Math.abs(parseFloat(style)) === 33.5 ? "1" : "0"
						}`,
					}}
				>
					<VerifyEmail
						setIsConfirm={setIsConfirm}
						classname={"signupConfirm"}
					/>
				</div>
				<Signup setStyle={setStyle} />
			</div>
		</div>
	);
};

export default Auth;
