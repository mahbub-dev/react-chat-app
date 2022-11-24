import "./App.scss";

// importing from modules
import io from "socket.io-client";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// importing from modals
import { UserDetails } from "./Components/Modals/index";

// importing from pages
import { Home, Login, Signup, Profile } from "./Pages/index";

// importing from components
import { Chatbox, User } from "./Components/index";

//importing from context
import { useGlobalContext } from "./context";

// const socket = io.connect("http://localhost:3001");
function App() {
	const token = localStorage.getItem("token");
	const { handleModals } = useGlobalContext();
	return (
		<div className="App">
			<div className="modals-view">
				<UserDetails />
			</div>
			<BrowserRouter>
				<Routes>
					<Route path="/profile" element={<Profile />} />
					<Route
						path="/login"
						element={token ? <Navigate to={"/"} /> : <Login />}
					/>
					<Route
						path="/signup"
						element={token ? <Navigate to={"/"} /> : <Signup />}
					/>
					<Route
						path={"/"}
						element={
							token ? (
								<Home handleModals={handleModals} />
							) : (
								<Navigate to={"/login"} />
							)
						}
					/>
					<Route
						path="/chat"
						element={
							<Chatbox
							// socket={socket}
							// room={room}
							// username={username}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
