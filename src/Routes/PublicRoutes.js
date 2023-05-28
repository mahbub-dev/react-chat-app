import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import SocketProvider from "../socketContext";
import { Auth, Home } from "../Pages";
import {
	ActiveUser,
	ChatList,
	Peoples,
	Profile,
	Settings,
} from "../Components";
import { getMessage } from "../Api Request/messageRequest";
import { AuthRoutes, HomeSecureRoutes } from "./PrivateRoutes";
import { Login, Signup, VerifyEmail } from "../Components/Auth";
import Reset from "../Pages/Auth/Reset/Reset";
import { ResetReq, SetPassword } from "../Components/Auth/ResetPass";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: (
					<SocketProvider>
						<HomeSecureRoutes>
							<Home />
						</HomeSecureRoutes>
					</SocketProvider>
				),

				children: [
					{
						path: "/t/:id",
						element: <ChatList />,
						loader: ({ params }) => {
							return getMessage(params.id, 30);
						},
					},
					{
						path: "/settings/t/:id",
						element: <Settings />,
					},
					{
						path: "/active/t/:id",
						element: <ActiveUser />,
					},
					{
						path: "/peoples/t/:id",
						element: <Peoples />,
					},
					{
						path: "/profile/t/:id",
						element: <Profile />,
					},
				],
			},
			{
				path: "/auth",
				element: <Auth />,
				children: [
					{
						path: "/auth",
						element: <Login />,
					},
					{
						path: "/auth/signup/",
						element: <Signup />,
					},
					{
						path: "/auth/confirm",
						element: <VerifyEmail />,
					},
					
					{
						path: "/auth/reset/",
						element: <Reset />,
						children: [
							{
								path: "/auth/reset/",
								element: <ResetReq />,
							},
							{
								path: "/auth/reset/setpassword",
								element: <SetPassword />,
							},
						],
					},
				],
			},
		],
	},
]);
export default router;
