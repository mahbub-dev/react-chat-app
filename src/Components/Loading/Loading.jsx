import React from "react";
import "./loading.scss";

const Loading = () => {
	return (
		<div className="loader">
			<div className="spinner">
				<svg viewBox="25 25 50 50" className="circular">
					<circle rokemiterlimit="10" storkewidth="3" fill="none" r="20" cy="50" cx="50" className="path"></circle>
				</svg>
			</div>
		</div>
	);
};

export default Loading;
