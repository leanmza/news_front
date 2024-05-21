import React, { useEffect, useState } from "react";
import "../../assets/Navbar.css";
import { Link } from "react-router-dom";
import { getCategories } from "../../util/getCategories";
import { getRole, validToken } from "../../util/securityService";

import MenuReader from "./MenuReader";
import MenuAdmin from "./MenuAdmin";
import SearchBar from "../SearchBar";

const Navbar = ({ isLogged, logout }) => {
  const [categories, setCategories] = useState([]);
  const role = getRole();

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories(setCategories);
    };
    fetchCategories();
  }, []);

  function handleLogin() {
    if (validToken != true || validToken === null || validToken === undefined) {
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-md col-md-10 col-8 ">
        <div className="divLogo col-4 col-md-2 col-lg-1">
          <Link to="/" className="link">
            <h2 className="logo">DeGeeks</h2>
          </Link>
        </div>

        <div className="divCategorias categorias col-6">
          <ul className="nav categorias-ul">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/publication/category/${category.name}`}
                  className="link"
                  value={category.name}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            {role === "ADMIN" ? (
              <li>
                <Link to="/publication/create" className="link">
                  Cargar
                </Link>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="divSearch col-2 offset-lg-1">
          <SearchBar />
        </div>
        <div className="divLogin col-1 offset-lg-1">
          {isLogged ? (
            role === "ADMIN" ? (
              <MenuAdmin logout={logout} />
            ) : (
              <MenuReader logout={logout} />
            )
          ) : (
            <Link to="/user/login" className="link">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
