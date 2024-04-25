// import React, { useState } from "react";
// import { Form } from "react-bootstrap";
// import axios from "axios";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [publicaciones, setPublicaciones] = useState([]);

//     const handleKeyPress = (e) => {
//       if (e.key === "Enter") {
//         // Si la tecla presionada es Enter, llama a la función handleSearch
//         handleSearch();
//       }
//     };

//     const handleSearch = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/publication/search`,
//           query
//         );

//         setPublicaciones(response.data.publacations)
//       } catch (error) {
//         console.error("Error en la carga de la búsqueda", error);
//       }
//     };
//     console.log(publicaciones);

//   console.log(query);
//   return (
//     <div>
//       <Form.Control
//         type="search"
//         placeholder="Buscar"
//         name="search"
//         className="form-control searchBar"
//         aria-label="Search"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKeyPress}
//       />
//     </div>
//   );
// };

// export default SearchBar;
