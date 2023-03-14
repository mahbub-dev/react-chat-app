import React, { useState } from "react";
import "./user.scss";
import { useGlobalContext } from "../../../../context";
import ApiRequest from "../../../../Api Request/apiRequest";

function User({ item, itemArray }) {
	const { OpenUserDetails } = useGlobalContext();
	const [removeItem, setRemoveItem] = useState(false)

	const handleAddDualConv = async (e) => {
		e.stopPropagation()
		try {
			await ApiRequest.post(
				`conversation/dual/${item?._id}`
			);
			setRemoveItem(true)
		} catch (error) {
			console.log(error)
		}

	}
	return (
		<>
			<div className="user" onClick={() => OpenUserDetails(true, item)} style={{ display: removeItem ? 'none' : 'flex' }} >
				<div className="img">
					<img src={item?.profilePicture} alt="img" />
				</div>
				<div className="name">
					<h4>{item?.username}</h4>
				</div>

				{/* handle add conversation  */}
				<button className="add-to-chat-btn" onClick={handleAddDualConv}>
					<img src="https://www.svgrepo.com/show/507876/user-add.svg" width={'30px'} alt="" />
				</button>
			</div>
		</>
	);
}

export default User;
