import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ImageShow, UserDetails } from "./Components/Modals";
import { Home, Auth } from "./Pages";
import SocketProvider from "./socketContext";
import Reset from "./Pages/Auth/Reset/Reset";


function App() {
	const user = localStorage.getItem("userId");
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
