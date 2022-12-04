import "./profile.scss";
import Item from "./Item";
import { useGlobalContext } from "../../context";
import { updateUser } from "../../Api Request/userRequest";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();
	const { loggedUser, setLoggedUser } = useGlobalContext();
	const handlePasswordChange = () => {};
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
			<div className="profile-box">
				<div className="profile-image">
					<label htmlFor="profilePic" className="chooseFile">
						<img src={loggedUser.profilePicture} alt="" />
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
						item={loggedUser?.username}
						name={"username"}
						handleUpdate={handleUpdate}
					/>
					<Item
						id={"btn2"}
						item={loggedUser?.email}
						name="email"
						handleUpdate={handleUpdate}
					/>
					<Item
						id={"btn3"}
						item={loggedUser?.phone}
						name="phone"
						handleUpdate={handleUpdate}
					/>
					<div className="editoption">
						<button className="logout">Change password</button>
					</div>
					<div className="editoption">
						<button
							className="logout"
							onClick={() => {
								localStorage.clear();
								navigate(`/`);
								window.location.reload();
							}}
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
