import { TiDelete } from "react-icons/ti";
import { updateUser } from "../../../Api Request/userRequest";
import { useGlobalContext } from "../../../context";
import { ChangeEmail, ChangPassword, handleProfilesModal } from "./index";
import Item from "./Item";
import { handleModals } from "../../../Utils/functions";
import "./profile.scss";

const Profile = () => {
	const { loggedUser, setLoggedUser } = useGlobalContext();
	const handleUpdate = (e) => {
		updateUser(loggedUser, (res) => {
			setLoggedUser(res);
		});
	};
	function imageUpload() {
		var file = document.querySelector("input[type=file]")["files"][0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (
				file.type === `image/jpg` ||
				file.type === "image/png" ||
				file.type === "image/jpeg"
			) {
				updateUser({ profilePicture: reader.result }, (data) => {
					setLoggedUser(data);
				});
			} else {
				alert("file type must be png,jpg or jpeg");
			}
		};
	}
	return (
		<div className="profile">
			<TiDelete
				className="proCross"
				onClick={() => handleModals(false, "profile")}
			/>
			<div className="profile-box">
				<ChangeEmail />
				<ChangPassword />
				<div className="profile-image">
					<label htmlFor="profilePic" className="chooseFile">
						<img src={loggedUser?.profilePicture} alt="" />
						<span>edit</span>
					</label>
					<input
						type="file"
						id="profilePic"
						name="profilePicture"
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
	);
};

export default Profile;
