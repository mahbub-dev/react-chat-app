export { default as ChangeEmail } from "./ChangeEmail/ChangeEmail";
export { default as ChangPassword } from "./ChangePass/ChangePass.jsx";

const handleProfilesModal = (isOpen, className) => {
	const element = document.querySelector(`.${className}`);
	if (isOpen) {
		element.style.display = "flex";
	} else {
		element.style.display = "none";
	}
};
export { handleProfilesModal };
