import "./App.scss";
import { Outlet } from "react-router-dom";
import { ImageShow, UserDetails } from "./Components/Modals";

function App() {

	return (
		<div className="App">
			<div className="modals-view">
				<UserDetails />
				<ImageShow />
			</div>
			<Outlet />
		</div>
	);
}

export default App;
