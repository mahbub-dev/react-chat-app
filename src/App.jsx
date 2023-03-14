import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ImageShow, UserDetails } from "./Components/Modals";
// import { ChangeEmail, ChangePassword } from "./Components/Modals/Profile";
import { Home, Auth } from "./Pages";
import SocketProvider from "./socketContext";
import Reset from "./Pages/Auth/Reset/Reset";
import { useState } from "react";
import axios from "axios";


function App() {
	const user = localStorage.getItem("userId");
	const [files, setFiles] = useState([]);
	const handleUpload = async (e) => {
		try {
			e.preventDefault();
			const formData = new FormData();
			for (const file of files) {
				formData.append('files', file)
			}
			const url = "http://localhost:4000/upload";
			const res = await axios.post(url, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleFiles = (e) => {
		setFiles(e.target.files);
	};


	return (
		<div className="App">
			<div className="modals-view">
				<UserDetails />
				<ImageShow />
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
