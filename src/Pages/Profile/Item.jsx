import React, { useState } from "react";
import "./Profile";
import { useGlobalContext } from "../../context";
const Item = ({ id, item, name, handleUpdate }) => {
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
		const array = ["btn1", "btn2", "btn3"];
		if (isEdit) {
			if (name !== "password" && item.length < 3) {
				alert("inputed data can not be less than 3");
			} else {
				setInputStyle({
					disabled: true,
					border: "none",
					padding: "0",
				});
				// request to server
				handleUpdate();
				array
					.filter((i) => i !== id)
					.forEach((i) => {
						const commonItem = document.getElementById(`${i}`);
						commonItem.removeAttribute("disabled");
					});
				setIsEdit(false);
			}
		} else {
			setInputStyle({
				disabled: false,
				border: "1px solid gray",
				padding: ".2rem",
			});
			array
				.filter((i) => i !== id)
				.forEach((i) => {
					const commonItem = document.getElementById(`${i}`);
					commonItem.setAttribute("disabled", true);
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
				onClick={handleInput}
			>
				{isEdit ? "save" : "edit"}
			</button>
		</div>
	);
};

export default Item;
