import React from "react";
import { getUser } from "../../Api Request/userRequest";
import "./search.scss";
import {BiSearch} from 'react-icons/bi'
import { useGlobalContext } from "../../context";
const Search = () => {
	const { setUserList } = useGlobalContext();

	return (
		<div className="search">
			<input
				type="text"
				placeholder="Search"
				onChange={(e) => {
					getUser(e.target.value, (data) => {
						setUserList(data);
					});
				}}
			/>
			<BiSearch className="search-icon" />
		</div>
	);
};

export default Search;
