import React, { useState } from "react";
import { useGlobalContext } from "../../../context";
import "./settings.scss";

const Settings = ({ setTheme }) => {
	const { soundRef } = useGlobalContext();
	const [display, setDisplay] = useState(true);
	return (
		<div className="settings">
			<button
				onClick={() => {
					display ? setDisplay(false) : setDisplay(true);
					soundRef.current
						? (soundRef.current = false)
						: (soundRef.current = true);
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
		</div>
	);
};

export default Settings;
