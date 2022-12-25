import tone from "./1 Text Message.mp3";
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
export default playSound
