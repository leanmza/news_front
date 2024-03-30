import React from "react";
import "../assets/Navbar.css";
import { Link } from "react-router-dom";
import logo from '../assets/img/logo-news.png'

const Navbar = () => {
  return (
    <div>
      <header>
        <div className="divHeader row">
          <nav className="navbar navbar-expand-md col-md-10 col-8 ">
            <div className="divLogo col-4 col-md-1">
            <Link to='/'><img
                            src={logo}
                            className="logoHeader"
                            alt="logo"
                            />
            </Link>        
            </div>
       
            <div className="divMenu col-lg-7 col-md-9">
              <div className="row rowCategorias">
                <ul className="nav categorias">
                  <li>  
                    <Link to="/mendoza" className="link">MENDOZA</Link>
                  </li>
                  <li>
                    <Link to="/pais" className="link">PAÍS</Link>
                  </li>
                  <li>
                    <Link to="/mundo" className="link">MUNDO</Link>
                  </li>
                  <li>
                    <Link to="/policiales" className="link">POLICIALES</Link>
                  </li>
                  <li>
                    <Link to="/libros" className="link">LIBROS</Link>
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
            <Link to='/login' className="link">
                     <span className="spanLogin"> Iniciar Sesión</span></Link>
          </div>
          </nav>


        </div>
      </header>
    </div>
  );
};

export default Navbar;

