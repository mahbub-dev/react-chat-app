import ApiRequest from "./apiRequest";
// create conversation api
const createConversation = async (receiverId, cb) => {
	try {
		const { data } = await ApiRequest.post("/conversation", { receiverId });
		cb(data);
	} catch (err) {
		cb(err);
	}
};

const getCoversation = async (userId, cb) => {
	try {
		const { data } = await ApiRequest.get(`/conversation/${userId}`);
		cb(data);
	} catch (err) {
		cb(err);
	}
};
// delete conversation
const deleteConversation = async (convId, cb) => {
	try {
		const { data } = await ApiRequest.delete(`/conversation/${convId}`);
		cb(data);
	} catch (err) {
		console.log(err);
		cb(err);
	}
};

const updateConversation = async (data, cb) => {
	try {
		await ApiRequest.put("/conversation/update", { data });
	} catch (err) {
		cb(err);
		console.log(err);
	}
};

const updateSeenStatus = async (convId, cb) => {
	try {
		const res = await ApiRequest.put(
			`conversation/message/updateseen/${convId}`
		);
		cb(res);
	} catch (error) {
		cb(error?.response);
		console.log(error);
	}
};
export {
	createConversation,
	getCoversation,
	deleteConversation,
	updateConversation,
	updateSeenStatus,
};
