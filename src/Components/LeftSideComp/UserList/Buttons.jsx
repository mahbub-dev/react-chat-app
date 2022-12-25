import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../context";
import addFrdIcon from "../../../Image/add-friend (1).png";
import chatIcon from "../../../Image/chat (1).png";
import settingsIcon from "../../../Image/settings.png";
import Search from "../Search/Search";
import Settings from "../Settings/Settings";
import AllUser from "./AllUser/AllUser";

const Button = ({ handleRender, item, index }) => {
	const { newMessagCount } = useGlobalContext();
	return (
		<button
			className={`btn${index}`}
			onClick={() => {
				handleRender(item.renderId, `btn${index}`);
			}}
			ref={item.reff}
		>
			<img src={item.icon} alt="button" />
			{index === 1 && newMessagCount > 0 && <b>{newMessagCount}</b>}
		</button>
	);
};

const Buttons = ({ conversation, setConversation, setUserComp, allUser }) => {
	const { searchValue } = useGlobalContext();
	const [notAddedUser, setNotAddedUser] = useState([]);
	useEffect(() => {
		const convusersId = [];
		conversation?.forEach((c) => {
			const id = c?.member?.find(
				(item) => item !== localStorage.getItem("userId")
			);
			convusersId.push(id);
		});
		const r = allUser.filter((i) => !convusersId.includes(i._id));
		setNotAddedUser(r);
	}, [conversation, setNotAddedUser, allUser]);
	const allusers = (
		<>
			<Search />
			{notAddedUser.length
				? notAddedUser.map((i, ind) => {
						return (
							<div key={ind}>
								<AllUser
									userId={i}
									setConversation={setConversation}
									conversation={conversation}
								/>
							</div>
						);
				  })
				: "No new user"}
		</>
	);

	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const handleStyle = (className) => {
		const classArr = [ref1.current, ref2.current, ref3.current];
		for (let i = 0; i < classArr.length; i++) {
			const element = classArr[i];
			if (element.className === className) {
				element.style.backgroundColor = "black";
			} else {
				element.style.backgroundColor = "#F0F0F0";
			}
		}
	};

	const handleRender = (renderId, className) => {
		handleStyle(className);
		renderId === "add" && setUserComp(allusers);
		renderId === "chat" && setUserComp("");
		renderId === "settings" && setUserComp(<Settings />);
	};
	useEffect(() => {
		allUser.length && handleRender("add", "btn0");
	}, [searchValue]);
	const data = [
		{ icon: addFrdIcon, renderId: "add", reff: ref1 },
		{ icon: chatIcon, renderId: "chat", reff: ref2 },
		{ icon: settingsIcon, renderId: "settings", reff: ref3 },
	];
	return (
		<div className="buttons">
			{data.map((item, index) => (
				<Button
					handleRender={handleRender}
					item={item}
					index={index}
					key={index}
				/>
			))}
		</div>
	);
};
export default Buttons;
