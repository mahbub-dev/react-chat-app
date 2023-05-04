import ApiRequest from "./apiRequest";
const createMessage = async ({ conversationId, message }, cb) => {
	try {
		const { data } = await ApiRequest.post("/message", {
			conversationId,
			message,
		});
		cb(data);
	} catch (err) {
		cb(err);
	}
};

// const getMessage = async (coversationId, cb) => {
// 	try {
// 		const res = await ApiRequest.get(`/message/${coversationId}`);
// 		cb(res);
// 	} catch (err) {
// 		cb(err);
// 	}
// };

const updateSeenStatus = async (data, cb) => {
	try {
		const res = await ApiRequest.put("message/status", { data });
		cb(res);
	} catch (err) {
		cb(err);
		console.log(err);
	}
};

const getMessage = async (convId, page) => {
	try {
		const res = await ApiRequest.get(
			`/conversation/message/${convId}/?page=${page}`
		);
		return res;
	} catch (error) {
		console.log(error?.response);
		return error.response;
	}
};
export { createMessage, getMessage, updateSeenStatus };
