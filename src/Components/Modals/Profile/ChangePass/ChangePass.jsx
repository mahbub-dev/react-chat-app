import React, { useState } from "react";
import { TiDelete } from "react-icons/ti";
import { updateUser } from "../../../../Api Request/userRequest";
import showPass from "../../../../Image/eye (1).png";
import notShowPass from "../../../../Image/eye-crossed.png";
import { handleProfilesModal } from "../index";
import "./changePass.scss";

export const PasswordInput = ({ placeholder, name, value, handleChange }) => {
	const [isShow, setIsShow] = useState(false);

	return (
		<>
			<div onClick={() => (isShow ? setIsShow(false) : setIsShow(true))}>
				{isShow ? (
					<img className="isShow" src={notShowPass} alt="notshow" />
				) : (
					<img className="isShow" src={showPass} alt="show" />
				)}
			</div>
			<input
				onChange={handleChange}
				type={isShow ? "text" : "password"}
				placeholder={placeholder}
				name={name}
				value={value}
			/>
		</>
	);
};

function ChangPassword() {
	const [password, setPassword] = useState({
		oldPass: "",
		newPass: "",
		confirmNewPass: "",
	});
	const [res, setRes] = useState();

	const handleChange = (e) => {
		setPassword((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
	const handleUpdate = () => {
		updateUser(password, (res) => {
			console.log(res);
			typeof res === "object" ? setRes(true) : setRes(res);
		});
	};
	return (
		<div className="changePass">
			<div className="modalsWrapper">
				<TiDelete
					className="close"
					onClick={() => handleProfilesModal(false, "changePass")}
				/>

				{res === true ? (
					<p>Password has successfuly changed</p>
				) : (
					<div className="inputBox">
						<PasswordInput
							handleChange={handleChange}
							value={password.oldPass}
							placeholder="Old password"
							name={"oldPass"}
						/>
						<PasswordInput
							value={password.newPass}
							handleChange={handleChange}
							placeholder="New password"
							name="newPass"
						/>
						<PasswordInput
							handleChange={handleChange}
							value={password.confirmNewPass}
							placeholder="Confirm new password"
							name="confirmNewPass"
						/>

						{res === "wrongPass" && <p>Wrong old password</p>}

						<button
							disabled={
								password.newPass === password.confirmNewPass &&
								password.newPass.length > 4
									? false
									: true
							}
							onClick={handleUpdate}
						>
							Submit
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default ChangPassword;
