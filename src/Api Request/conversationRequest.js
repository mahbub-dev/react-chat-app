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

export { createConversation, getCoversation, deleteConversation };

