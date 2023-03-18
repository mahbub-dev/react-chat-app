/* eslint-disable no-loop-func */
import tone from "./Iphone 7 Message Tone.mp3";
import { ApiRequestFormData } from "../Api Request/apiRequest";

// handle emoji selection
document.addEventListener("mousedown", (event) => {
	const btn = document.querySelector(".emoji");
	const emojiDiv = document.querySelector(".customEmoji");

	if (btn?.contains(event.target)) {
		if (emojiDiv.style.display === "none") {
			emojiDiv.style.display = "flex";
		} else {
			emojiDiv.style.display = "none";
		}
	} else {
		if (emojiDiv) {
			if (emojiDiv.contains(event?.target)) {
				emojiDiv.style.display = "flex";
			} else {
				emojiDiv.style.display = "none";
			}
		}
	}
});

// hide user option when new one is shown
const optionHide = (ids) => {
	ids.forEach((i) => {
		document.getElementById(i).style.display = "none";
	});
};

// for responsive
const responSive = (direction) => {
	const right = document.querySelector(".rightside");
	const left = document.querySelector(".leftside");
	const navButtons = document.querySelector(".navButtons");
	if (direction === "right") {
		localStorage.setItem("isChatBoxOpened", "true");
		left.style.position = "absolute";
		left.style.transform = `translateX(-100%)`;
		right.style.position = "initial";
		navButtons.style.opacity = "0";
		navButtons.style.width = "0";
		right.style.transform = "translateX(0%)";
	} else {
		localStorage.setItem("isChatBoxOpened", "false");
		navButtons.style.opacity = "1";
		navButtons.style.width = "50px";
		right.style.position = "absolute";
		right.style.transform = "translateX(-100%)";
		left.style.position = "initial";
		left.style.transform = `translateX(0%)`;
	}
};

// for handling modals
const handleModals = (isOpen = false, className) => {
	const openUser = document.querySelector(`.${className}`);
	const app = document.querySelector("body");
	const modalView = document.querySelector(".modals-view");
	if (isOpen) {
		openUser.style.display = "block";
		app.style.overflowY = "hidden";
		modalView.style.display = "block";
	} else {
		openUser.style.display = "none";
		modalView.style.display = "none";
	}
};

const playSound = () => {
	let audio = new Audio(tone);
	audio.addEventListener("canplaythrough", () => {
		audio.play().catch((e) => {
			window.addEventListener(
				"click",
				() => {
					audio.play();
					window.removeEventListener("click", () => {});
				},
				{ once: true }
			);
		});
	});
};

const handleUpload = async (event, type, cb) => {
	if (type === "image") {
		const res = await handleImageUpload(event);
		cb(res);
	} else {
		const res = await handleAttachMentUpload(event);
		const pdf = [];
		const videos = [];
		const audios = [];
		res.forEach((i) => {
			if (i.endsWith(".mp4" || ".mkv")) {
				videos.push(i);
			} else if (i.endsWith(".mp3")) {
				audios.push = i;
			} else if (i.endsWith("pdf")) {
				pdf.push(i);
			}
		});
		cb({ audios, videos, pdf });
	}
};
// handle image upload
const handleImageUpload = async (event) => {
	try {
		const files = event.target.files;
		if (files.length < 3) {
			const formData = new FormData();
			for (const file of files) {
				if (
					file.type === `image/jpg` ||
					file.type === "image/png" ||
					file.type === "image/jpeg"
				) {
					formData.append("files", file);
				} else {
					alert("You can upload only jpg,png,jpeg file");
				}
			}
			const response = await ApiRequestFormData.post(
				"/uploads",
				formData
			);
			return response.data;
		} else {
			alert("You can not upload more than 2 image at a time");
		}
	} catch (error) {
		console.log(error?.response);
	}
};

// handle attachment upload
const handleAttachMentUpload = async (event) => {
	try {
		const files = event.target.files;
		const formData = new FormData();
		for (const file of files) {
			if (
				[
					"application/pdf",
					"video/mp4",
					"video/mkv",
					"audio/mp3",
				].includes(file.type)
			) {
				formData.append("files", file);
			} else {
				alert("Your file type is not supported in our system");
			}
		}
		const response = await ApiRequestFormData.post("/uploads", formData);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// get date month and year
const getSendDate = (data) => {
	const date = new Date(data);
	const newDate = new Date();
	if (date.toDateString() === newDate.toDateString()) {
		return true;
	} else {
		return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
	}
};

// focus input when reply
const focusInput = () => {
	const elem = document.getElementById("messageTextInputField");
	const elem2 = document.querySelector(".reply-info");
	elem2.style.display = "block";
	elem.focus();
};

// detect last seen Message Object
const getLastSeenMessag = (message) => {
	if (Array.isArray(message)) {
		return message
			?.slice()
			?.reverse()
			?.find((m) =>
				m.seenBy.includes(localStorage.getItem("receiverId"))
			);
	} else {
		return {};
	}
};

// send notification
const showNotification = (data) => {
	const elem = document.querySelector(".notificaion");
	const message = data.message[data.message.length - 1];
	// console.log(message);
	
	elem.innerHTML = `<p><b>${message.sender.username} messaged you</b><br/><span>${message.text}</span></p>`;
	elem.style.top = "0px";
	setTimeout(() => {
		elem.style.top = "-55px";
	}, 2000);
};
export {
	responSive,
	getSendDate,
	handleModals,
	playSound,
	handleUpload,
	optionHide,
	focusInput,
	getLastSeenMessag,
	showNotification,
};
