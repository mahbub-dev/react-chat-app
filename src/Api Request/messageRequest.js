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

const getMessage = async (coversationId, cb) => {
	try {
		const res = await ApiRequest.get(`/message/${coversationId}`);
		cb(res);
	} catch (err) {
		cb(err);
	}
};
export { createMessage, getMessage };

