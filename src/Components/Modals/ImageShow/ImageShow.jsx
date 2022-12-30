import React from "react";
import { TiDelete } from "react-icons/ti";
import { useGlobalContext } from "../../../context";
import { handleModals } from "../../../Utils/functions";
import "./imageshow.scss";
const ImageShow = () => {
	const { showImage} = useGlobalContext();
	return (
		<div className="imageShow">
			<TiDelete
				onClick={() => handleModals(false, "imageShow")}
				className="cross"
			/>
			<img src={showImage} alt="img" />
			<a href={showImage} download>
				Dowload
			</a>
		</div>
	);
};

export default ImageShow;
