import React, { useEffect, useState } from "react";
import "../assets/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-news.png";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data.categories); // Asumiendo que response.data es un array de categorías
    } catch (error) {
      console.error("Error en la carga de categorias", error);
    }
  };
  return (
    <div>
      <header>
        <div className="divHeader row">
          <nav className="navbar navbar-expand-md col-md-10 col-8 ">
            <div className="divLogo col-4 col-md-1">
              <Link to="/">
                <img src={logo} className="logoHeader" alt="logo" />
              </Link>
            </div>

            <div className="divMenu col-lg-7 col-md-9">
              <div className="row rowCategorias">
                <ul className="nav categorias">
                  {categories.map((category) => (
                    <li>
                      <Link to={`/category/${category.name}`}
                        className="link"
                        key={category.id}
                        value={category.name}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                
                  <li>
                    <Link to="/publication/create" className="link">
                      Cargar
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="divSearch col-3">
              <form
                role="search"
                method="GET"
                className="form searchForm"
                id="formLogin"
              >
                <input
                  id="word"
                  type="search"
                  className="form-control searchBar"
                  placeholder="Buscar"
                  aria-label="Search"
                />
              </form>
            </div>

            <div className="divLogin col-2">
              <Link to="/login" className="link">
                <span className="spanLogin"> Iniciar Sesión</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
