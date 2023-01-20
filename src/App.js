import "./App.scss";
// Import the functions you need from the SDKs you need
// importing from modules
// import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// importing from modals
import { ImageShow, Profile, UserDetails } from "./Components/Modals/index";
import { ChangeEmail, ChangPassword } from "./Components/Modals/Profile/index";

// importing from pages
import ResetPass from "./Components/Modals/ResetPass/ResetPass";
import { Home, Login, Signup } from "./Pages/index";
import Confirm from "./Pages/Signup/Confirm";
import SocketProvider from "./socketContext";
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
				<ResetPass />
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
						element={user ? <Navigate to={`/home`} /> : <Login />}
					/>
					<Route
						path="/signup/confirm"
						element={user ? <Navigate to={"/home"} /> : <Confirm />}
					/>
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
