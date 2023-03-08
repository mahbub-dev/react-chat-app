import ApiRequest from "./apiRequest";

// create user request
const createUser = async (signupData, callback) => {
	try {
		const res = await ApiRequest.post("/user/register", signupData);
		localStorage.setItem("signupEmail", res?.email);
		callback(res);
	} catch (err) {
		console.log(err);
		callback(err?.response);
	}
};

const updateUser = async (updateUserData, cb) => {
	try {
		const res = await ApiRequest.put("/user", {
			updateUserData,
		});
		cb(res);
	} catch (er) {
		cb(er?.response);
	}
};

const getUser = async (searchText = "", cb) => {
	try {
		const res = await ApiRequest.get(`/user/?search=${searchText}`);
		cb(res);
	} catch (err) {
		console.log(err);
		cb(err?.response);
	}
};
const getUserById = async (id, cb) => {
	try {
		const res = await ApiRequest.get(`/user/${id}`);
		cb(res);
	} catch (err) {
		console.log(err);
		cb(err?.response);
	}
};
export { createUser, updateUser, getUser,getUserById };
