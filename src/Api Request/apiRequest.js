import axios from "axios";
const baseUrl = "http://localhost:4000";
const cloudBaseUrl = "https://chat-api-l2db.onrender.com";
const token = localStorage.getItem("token");

const ApiRequest = axios.create({
	baseURL: cloudBaseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "true",

		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export default ApiRequest;
