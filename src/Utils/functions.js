﻿/* eslint-disable no-loop-func */
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
	if (direction === "right") {
		left.style.position = "absolute";
		left.style.transform = `translateX(-100%)`;
		right.style.position = "initial";
		right.style.transform = "translateX(0%)";
	} else {
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
				},
				{ once: true }
			);
		});
	});
};

const handleImageChange = async (cb) => {
	const file = document.querySelector("#uploadImage")["files"];
	const files = [];
	for (let i = 0; i < file.length; i++) {
		files.push(file[i]);
	}
	if (files.length < 3) {
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			const elem = files[i];
			if (
				elem.type === `image/jpg` ||
				elem.type === "image/png" ||
				elem.type === "image/jpeg"
			) {
				formData.append("files", elem);
			} else {
				alert("You can upload only jpg,png,jpeg file");
			}
		}

		const response = await ApiRequestFormData.post("/uploads", formData);
		cb(response.data);
	} else {
		alert("You can not upload more than 2 image at a time");
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
export {
	responSive,
	getSendDate,
	handleModals,
	playSound,
	handleImageChange,
	optionHide,
	focusInput,
	getLastSeenMessag,
};
