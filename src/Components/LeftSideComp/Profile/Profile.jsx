import { useRef, useState } from "react";
import { updateUser } from "../../../Api Request/userRequest";
import { useGlobalContext } from "../../../context";
import { ChangeEmail, ChangPassword, handleProfilesModal } from "./index";
import { ApiRequestFormData } from "../../../Api Request/apiRequest";
import Item from "./Item";
import "./profile.scss";

const Profile = () => {
	const { loggedUser } = useGlobalContext();
	const [uploadeProfilePicture, setUploadProfilePicture] = useState('')
	const formData = new FormData()
	const handleUpdate = async (e) => {
		updateUser(loggedUser, (res) => { });
	};
	async function imageUpload(e) {
		try {
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = async () => {
				if (
					file.type === `image/jpg` ||
					file.type === "image/png" ||
					file.type === "image/jpeg"
				) {

					formData.append('files', file)
					formData.append('profilePicture', loggedUser.profilePicture)
					await ApiRequestFormData.put(`user/`, formData)
					setUploadProfilePicture(reader.result)
				} else {
					alert("file type must be png,jpg or jpeg");
				}
			};
		} catch (error) {
			console.log(error)
		}

	}
	return (
		<form encType="multipart/form-data" >
			<div className="profile">
				<div className="profile-box">
					<ChangeEmail />
					<ChangPassword />
					<div className="profile-image">
						<label htmlFor="profilePic" className="chooseFile">
							<img src={uploadeProfilePicture ? uploadeProfilePicture : loggedUser?.profilePicture} alt="" />
							<span>edit</span>
						</label>
						<input
							type="file"
							id="profilePic"
							name="files"
							onChange={imageUpload}
						/>
					</div>
					<hr />
					<div className="option-container">
						<Item
							id={"btn1"}
							buttonElem={"Edit"}
							item={loggedUser?.username}
							name={"username"}
							handleUpdate={handleUpdate}
						/>
						<Item
							id={"btn2"}
							buttonElem={"Edit"}
							item={loggedUser?.email}
							name="email"
							handleUpdate={() =>
								handleProfilesModal(true, "change-email")
							}
						/>
						<Item
							id={"btn3"}
							buttonElem={"Edit"}
							item={loggedUser?.phone}
							name="phone"
							handleUpdate={handleUpdate}
						/>
						<div className="editoption">
							<button
								className=""
								onClick={() =>
									handleProfilesModal(true, "changePass")
								}
							>
								Change password
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Profile;
