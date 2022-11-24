import ApiRequest from "./apiRequest";

// request for signup

// reqest for login
const loginRequest = async ({ loginId, password }, callback) => {
	try {
		const { data } = await ApiRequest.post("/auth/login", {
			loginData: {
				loginId,
				password,
			},
		});
		localStorage.setItem("token", data?.token);
		localStorage.setItem("userId", data?.loginuser?._id);
		console.log(data);
		callback(data);
	} catch (err) {
		// console.log(err);
		callback(err);
	}
};

export { loginRequest };
