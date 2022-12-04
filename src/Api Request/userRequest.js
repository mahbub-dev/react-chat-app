import ApiRequest from "./apiRequest";

// create user request
const createUser = async (signupData, callback) => {
	try {
		const { data } = await ApiRequest.post("/user/register", {
			signupData,
		});
		callback(data);
	} catch (err) {
		console.log(err);
		callback(err);
	}
};

const updateUser = async (updateUserData, cb) => {
	try {
		const { data } = await ApiRequest.put("/user", {
			updateUserData,
		});
		cb(data);
	} catch (er) {
		console.log(er);
	}
};

const getUser = async (searchText = "", cb) => {
	try {
		const { data } = await ApiRequest.get(`/user/?search=${searchText}`);
		cb(data);
		data === "not found" && cb("");
		// if (cb !== null) {
		// 	cb(data);
		// }
	} catch (err) {
		console.log(err);
	}
};
export { createUser, updateUser, getUser };
