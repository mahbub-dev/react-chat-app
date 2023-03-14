import React, { useState } from "react";
import { useGlobalContext } from "../../../context";
import "./Profile";
const Item = ({ id, item, name, handleUpdate, buttonElem }) => {
	const { setLoggedUser } = useGlobalContext();
	const [isEdit, setIsEdit] = useState(false);
	const [inputStyle, setInputStyle] = useState({ disabled: true });

	let type;
	if (name === "email") {
		type = "email";
	} else {
		type = "text";
	}

	const handleInput = () => {
		if (isEdit) {
			setInputStyle({
				disabled: true,
				border: "none",
				padding: "0",
			});
			// request to server
			handleUpdate();
			setIsEdit(false);
		} else {
			setInputStyle({
				disabled: false,
				border: "1px solid gray",
				padding: ".2rem",
			});
			setIsEdit(true);
		}
	};
	return (
		<div className="editoption">
			<p>{name === "username" ? "name" : name}</p>
			<input
				style={{
					border: inputStyle.border,
					padding: inputStyle.padding,
				}}
				type={type}
				value={item ? item : ""}
				disabled={inputStyle.disabled}
				name={name}
				onChange={(e) =>
					setLoggedUser((p) => ({
						...p,
						[e.target.name]: e.target.value,
					}))
				}
			/>
			<button
				id={id}
				type="button"
				disabled={false}
				onClick={id !== "btn2" ? handleInput : handleUpdate}
			>
				{buttonElem}
			</button>
		</div>
	);
};

export default Item;
