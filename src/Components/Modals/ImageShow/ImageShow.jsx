import React from "react";
import "./imageshow.scss";
import { TiDelete } from "react-icons/ti";
import { useGlobalContext } from "../../../context";
const ImageShow = () => {
	const { showImage, handleModals } = useGlobalContext();
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
