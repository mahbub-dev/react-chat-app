import ApiRequest from "./apiRequest";

// request for signup

// reqest for login
const loginRequest = async ({ loginId, password }, callback) => {
	try {
		const response = await ApiRequest.post("/auth/login", {
			loginId,
			password,
		});
		console.log(loginId)
		response?.data?.token &&
			localStorage.setItem("token", response?.data?.token);
		response?.data?.token &&
			localStorage.setItem("userId", response?.data?._id);
		callback(response);
	} catch (err) {
		callback(err?.response);
	}
};

const ConfirmEmail = async (code, cb) => {
	try {
		const res = await ApiRequest.post(
			`auth/confirm/?email=${localStorage.getItem(
				"confirmEmail"
			)}&code=${code}`
		);
		cb(res);
	} catch (err) {
		cb(err?.response);
	}
};

const SendConfirmCode = async (inputVal, cb) => {
	try {
		const res = await ApiRequest.post(`auth/sendCode/${inputVal}`);
		cb(res);
		
	} catch (error) {
		cb(error?.response);
		console.log(error?.response?.data);
		console.log(error);
	}
};
export { loginRequest, ConfirmEmail, SendConfirmCode };
