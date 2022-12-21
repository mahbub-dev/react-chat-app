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
		data?.token && localStorage.setItem("token", data?.token);
		data?.token && localStorage.setItem("userId", data?.loginuser?._id);
		console.log(data);
		callback(data);
	} catch (err) {
		// console.log(err);
		callback(err);
	}
};

const confirmEmail = async (code, cb) => {
	const email = localStorage.getItem("signupEmail");
	try {
		const res = await ApiRequest.get(
			`/auth/signup/confirm/${code}/?email=${email}&client=true`
		);
		cb(res);
	} catch (err) {
		cb(err);
	}
};
export { loginRequest, confirmEmail };

