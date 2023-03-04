import "./App.scss";
// Import the functions you need from the SDKs you need
// importing from modules
// import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// importing from modals
import { ImageShow, Profile, UserDetails } from "./Components/Modals/index";
import { ChangeEmail, ChangPassword } from "./Components/Modals/Profile/index";

// importing from pages
import { Home, Auth } from "./Pages/index";
import SocketProvider from "./socketContext";
import Reset from "./Pages/Auth/Reset/Reset";
//importing from context

function App() {
	const user = localStorage.getItem("userId");

	return (
		<div className="App">
			<div className="modals-view">
				<UserDetails />
				<ImageShow />
				<Profile>
					<ChangeEmail />
					<ChangPassword />
				</Profile>
			</div>

			<BrowserRouter>
				<Routes>
					<Route
						path={"/:userId"}
						element={
							user ? (
								<SocketProvider>
									<Home />
								</SocketProvider>
							) : (
								<Navigate to={"/"} />
							)
						}
					/>
					<Route
						path="/profile"
						element={user ? <Profile /> : <Navigate to={`/`} />}
					/>
					<Route
						path="/"
						element={user ? <Navigate to={`/home`} /> : <Auth />}
					/>
					<Route
						path="/auth/reset"
						element={user ? <Navigate to={"/home"} /> : <Reset />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
