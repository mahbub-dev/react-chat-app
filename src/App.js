import "./App.scss";
// Import the functions you need from the SDKs you need
// importing from modules
// import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// importing from modals
import { ImageShow, UserDetails } from "./Components/Modals/index";

// importing from pages
import ResetPass from "./Components/Modals/ResetPass/ResetPass";
import { Home, Login, Profile, Signup } from "./Pages/index";
import ChangeEmail from "./Pages/Profile/ChangeEmail/ChangeEmail";
import ChangPassword from "./Pages/Profile/ChangePass/ChangePass";
import Confirm from "./Pages/Signup/Confirm";

//importing from context

function App() {
	const user = localStorage.getItem("userId");

	return (
		<div className="App">
			<div className="modals-view">
				<UserDetails />
				<ImageShow />
				<ChangeEmail />
				<ChangPassword />
				<ResetPass />
			</div>

			<BrowserRouter>
				<Routes>
					<Route
						path={"/:userId"}
						element={user ? <Home /> : <Navigate to={"/"} />}
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
						path="/signup"
						element={user ? <Navigate to={`/home`} /> : <Signup />}
					/>
					<Route
						path="/signup/confirm"
						element={user ? <Navigate to={"/home"} /> : <Confirm />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
