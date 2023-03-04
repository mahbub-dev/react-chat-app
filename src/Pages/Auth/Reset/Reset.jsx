import React, { useEffect, useState } from "react";
import "./resetPass.scss";
import {
	ResetReq,
	SetPassword,
} from "../../../Components/Auth/ResetPass/index";
import { VerifyEmail } from "../../../Components/Auth";

const Reset = () => {
	const [style, setStyle] = useState("0px");
	const [isConfirm, setIsConfirm] = useState(false);
	useEffect(() => {
		// localStorage.setItem("isResetConfirm", "true");
		localStorage.getItem("confirmEmail") && setStyle("-104%");
		localStorage.getItem("resetPass") && setStyle("-208%");
	}, []);
	useEffect(() => {
		if (isConfirm) {
			setStyle("-208%");
			localStorage.setItem("resetPass", "set");
		}
	}, [isConfirm]);
	return (
		<div className="resetPass">
			<div className="compWrapper">
				<div
					className="innerCompWrapper"
					style={{ transform: `translateX(${style})` }}
				>
					<ResetReq setStyle={setStyle} />
					<VerifyEmail
						setIsConfirm={setIsConfirm}
						classname={"resetConfirm"}
					/>
					<SetPassword />
				</div>
			</div>
		</div>
	);
};

export default Reset;
