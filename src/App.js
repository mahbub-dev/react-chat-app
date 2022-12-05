import "./App.scss";
// Import the functions you need from the SDKs you need
// importing from modules
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// importing from modals
import { UserDetails, ImageShow } from "./Components/Modals/index";

// importing from pages
import { Home, Login, Signup, Profile, Chat } from "./Pages/index";

//importing from context
import { useGlobalContext } from "./context";
import SocketProvider from "./socketContext";


function App() {
	const token = localStorage.getItem("token");
	const { handleModals } = useGlobalContext();
	return (
		<div className="App">
			<div className="modals-view">
				<UserDetails />
				<ImageShow />
			</div>
			<BrowserRouter>
				<Routes>
					<Route path="/profile" element={<Profile />} />
					<Route
						path="/"
						element={
							token ? (
								<Navigate
									to={`/chat/${localStorage.getItem(
										"friendId"
									)}`}
								/>
							) : (
								<Login />
							)
						}
					/>
					<Route
						path="/message/:userId"
						element={
							<SocketProvider>
								<Chat />
							</SocketProvider>
						}
					/>
					<Route
						path="/signup"
						element={
							token ? (
								<Navigate
									to={`/chat/${localStorage.getItem(
										"convId"
									)}`}
								/>
							) : (
								<Signup />
							)
						}
					/>
					<Route
						path={"/chat/:userId"}
						element={
							token ? (
								<Home handleModals={handleModals} socket={""} />
							) : (
								<Navigate to={"/"} />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
