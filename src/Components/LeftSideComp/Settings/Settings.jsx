/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useGlobalContext } from "../../../context";
import OnOffBtn from "./OnOffBtn";
import "./settings.scss";

const Settings = () => {
	const { setSoundStatus, soundStatus, notificationStatus, setNotificationStatus } = useGlobalContext();
	return (
		<div className="settings">
			<div className="setting-item">
				<span>Sound</span>
				<OnOffBtn setting={'sound'} status={soundStatus} setStatus={setSoundStatus} />
			</div>
			<div className="setting-item">
				<span>Notification</span>
				<OnOffBtn setting={'notification'} status={notificationStatus} setStatus={setNotificationStatus} />
			</div>
		</div>
	);
};

export default Settings;
