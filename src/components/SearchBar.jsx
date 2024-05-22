import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../assets/SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/publication/search/${query}`;
    }
  };

  // console.log(query);
  return (
    <div className="search-container">
      <span className="material-symbols-outlined search-icon">search</span>
      <Form.Control
        type="search"
        placeholder="Buscar"
        name="search"
        className="form-control searchBar"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
