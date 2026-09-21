import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../styles/SearchBar.css"

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/publication/search/${query}`);
    }
  };

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
