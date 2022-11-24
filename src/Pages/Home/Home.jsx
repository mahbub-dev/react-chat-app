import React from "react";
import Desktop from "./Desktop/Desktop";
import "./home.scss";
import Mobile from "./Mobile/Mobile";

function Home({ handleModals }) {
	return (
		<div className="home" id="home">
			<Mobile andleModals={handleModals} />
			<Desktop handleModals={handleModals} />
		</div>
	);
}

export default Home;
