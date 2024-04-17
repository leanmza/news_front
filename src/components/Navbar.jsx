import React, { useEffect, useState } from "react";
import "../assets/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-news.png";
import { getCategories } from "../util/getCategories";
import {
  cleanToken,
  getRole,
  getToken,
  validToken,
} from "../util/securityService";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Verificar si el JWT está almacenado en localStorage
    const token = getToken();
    if (token) {
      setIsLogged(validToken());
    } else {
      // No hay token en localStorage, por lo que el usuario no está autenticado
      setIsLogged(false);
    }
  }, []);
  // console.log(isLogged);
  console.log(isLogged);

  const logout = () => {
    cleanToken();
    setIsLogged(false);
  };

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
                      <Link
                        to={`/category/${category.name}`}
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
              {isLogged ? (
                // Si el usuario está autenticado, mostrar el botón de cerrar sesión
                <span className="spanLogin" onClick={logout}>
                  Cerrar Sesión
                </span>
              ) : (
                // Si el usuario no está autenticado, mostrar el enlace para iniciar sesión
                <Link to="/login" className="link">
                  <span className="spanLogin">Iniciar Sesión</span>
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
