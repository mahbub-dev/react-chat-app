﻿import axios from "axios";
const baseUrl = process.env.REACT_APP_API_SERVER;
const token = localStorage.getItem("token");
const ApiRequest = axios.create({
	baseURL: baseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "true",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});
const ApiRequestFormData = axios.create({
	baseURL: baseUrl,
	headers: {
		// "Access-Control-Allow-Origin": "true",
		"Content-Type": "multipart/form-data",
		Authorization: `Bearer ${token}`,
	},
});

export default ApiRequest;
export { ApiRequestFormData };
