import axios from "axios";
const baseUrl = "http://localhost:4000";
const cloudBaseUrl = 'https://chats-api.onrender.com'
const token = localStorage.getItem("token");

const ApiRequest = axios.create({
	baseURL: baseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "true",
		
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

export default ApiRequest;
