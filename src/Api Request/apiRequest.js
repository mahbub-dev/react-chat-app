import axios from "axios";

let baseUrl = "";
process.env.NODE_ENV === "production"
	? (baseUrl = process.env.REACT_APP_API_SERVER)
	: (baseUrl = process.env.REACT_APP_DEV_API_SERVER);
const token = localStorage.getItem("token");
console.log(baseUrl);
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
