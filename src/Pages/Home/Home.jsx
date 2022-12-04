import React, { useEffect, useRef, useState } from "react";
import Desktop from "./Desktop/Desktop";
import "./home.scss";
import SocketProvider from "../../socketContext";
import Mobile from "./Mobile/Mobile";
import { io } from "socket.io-client";
function Home({ handleModals }) {

	return (
		<div className="home" id="home">
			<SocketProvider>
				<Mobile handleModals={handleModals} />
				<Desktop />
			</SocketProvider>
		</div>
	);
}

export default Home;
