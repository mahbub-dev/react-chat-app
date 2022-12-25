import React from "react";
import { BiSearch } from "react-icons/bi";
import { useGlobalContext } from "../../../context";
import "./search.scss";
const Search = () => {
	const { setSearchValue } = useGlobalContext();

	return (
		<div className="search">
			<input
				type="text"
				placeholder="Search"
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<BiSearch className="search-icon" />
		</div>
	);
};

export default Search;
