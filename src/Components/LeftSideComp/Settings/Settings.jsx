import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { handleModals } from "../../../Utils/functions";
import "./settings.scss";

const Settings = ({ setTheme }) => {
	const profileIcon =
		"https://cdn-icons-png.flaticon.com/128/3237/3237472.png";
	const logoutIcon =
		"https://cdn-icons-png.flaticon.com/128/4980/4980424.png";
	const { soundRef } = useGlobalContext();
	const [display, setDisplay] = useState(true);
	useEffect(() => {
		const s = localStorage.getItem("sound");
		setDisplay(s === "yes" ? true : false);
	}, []);
	const navigate = useNavigate();
	// sound button
	const SoundButton = (
		<button
			onClick={() => {
				if (soundRef.current === "yes") {
					soundRef.current = "no";
					localStorage.setItem("sound", "no");
					setDisplay(false);
				} else {
					soundRef.current = "yes";
					localStorage.setItem("sound", "yes");
					setDisplay(true);
				}
			}}
		>
			{display ? (
				<img
					src="https://cdn-icons-png.flaticon.com/128/5583/5583000.png"
					alt="sound"
				/>
			) : (
				<img
					src="https://cdn-icons-png.flaticon.com/128/4225/4225646.png"
					alt="sound"
				/>
			)}

			<span>Sound</span>
		</button>
	);
	return (
		<div className="settings">
			<button
				onClick={() => {
					handleModals(true, "profile");
				}}
			>
				<img src={profileIcon} alt="user" />
				<span>Profile</span>
			</button>
			{SoundButton}
			<button
				onClick={() => {
					localStorage.clear();
					navigate("/");
				}}
			>
				<img src={logoutIcon} alt="logout" />
				<span>Logout</span>
			</button>
		</div>
	);
};

export default Settings;
