import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from "./context";
import "./index.scss";
import {
	RouterProvider,
} from "react-router-dom";
import router from "./Routes/PublicRoutes";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>
);
