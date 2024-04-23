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
    <div>
      <header>
        <div className="divHeader row">
          <nav className="navbar navbar-expand-md col-md-10 col-8 ">
            <div className="divLogo col-4 col-md-2">
              <Link to="/" className="link">
                <h2>DeGeeks</h2>
              </Link>
            </div>

            <div className="divMenu col-6">
              <div className="row rowCategorias">
                <ul className="nav categorias">
                  {categories.map((category) => (
                    <li>
                      <Link
                        to={`/publication/category/${category.name}`}
                        className="link"
                        key={category.id}
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
            </div>

            <div className="divSearch col-2">
              {/* <SearchBar /> */}
            </div>
            <div className="divLogin col-2">
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
        </div>
      </header>
    </div>
  );
};

export default Navbar;
