import React, { useState } from "react";
import { Form } from "react-bootstrap";


const SearchBar = () => {
  const [query, setQuery] = useState("");


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        window.location.href = `/publication/search/${query}`;
    }
  };



  console.log(query);
  return (
    <div>
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
