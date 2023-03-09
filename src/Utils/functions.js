/* eslint-disable no-loop-func */
import tone from "./Iphone 7 Message Tone.mp3";

// handle emoji selection
document.addEventListener("mousedown", (event) => {
    const btn = document.querySelector(".emoji");
    const emojiDiv = document.querySelector(".customEmoji");

    if (btn ?. contains(event.target)) {
        if (emojiDiv.style.display === "none") {
            emojiDiv.style.display = "flex";
        } else {
            emojiDiv.style.display = "none";
        }
    } else {
        if (emojiDiv) {
            if (emojiDiv.contains(event ?. target)) {
                emojiDiv.style.display = "flex";
            } else {
                emojiDiv.style.display = "none";
            }
        }
    }
});

const optionHide = (ids) => {
    ids.forEach((i) => {
        document.getElementById(i).style.display = 'none'
    })

}

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
            window.addEventListener("click", () => {
                audio.play();
            }, {once: true});
        });
    });
};

const handleImageChange = (cb) => {
    const file = document.querySelector("#uploadImage")["files"];
    const files = [];
    const image = [];
    for (let i = 0; i < file.length; i++) {
        files.push(file[i]);
    }
    if (files.length < 3) {
        for (let i = 0; i < files.length; i++) {
            const elem = files[i];
            const reader = new FileReader();
            reader.readAsDataURL(elem);
            reader.onloadend = () => {
                if (elem.type === `image/jpg` || elem.type === "image/png" || elem.type === "image/jpeg") {
                    image.push(reader.result);
                } else {
                    alert("You can upload only jpg,png,jpeg file");
                }
            };
        }
    } else {
        alert("You can not upload more than 2 image at a time");
    }

    setTimeout(() => {
        cb(image);
    }, 1000);
};

// get date month and year
const getSendDate = (data) => {
    const date = new Date(data)
    const newDate = new Date()
    if (date.toDateString() === newDate.toDateString()) {
        return true
    } else {
        return(`${
            date.toDateString()
        } at ${
            date.toLocaleTimeString()
        }`)
    }
}
export {
    responSive,
    getSendDate,
    handleModals,
    playSound,
    handleImageChange,
    optionHide
};
