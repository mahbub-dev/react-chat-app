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
		const { data } = await ApiRequest.put("/user", {updateUserData});
		cb(data);
	} catch (er) {
		console.log(er);
	}
};

export { createUser, updateUser};
