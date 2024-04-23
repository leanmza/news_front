import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { getUserName } from "../../util/securityService";

const MenuAdmin = ({ logout }) => {
  return (
    <div>
      <NavDropdown
        id="nav-dropdown-dark-example"
        className="spanLogin"
        title="Cuenta"
      >
        <NavDropdown.Item className="spanLogin">
          <Link to="publication/create" className="link">
            Nueva Publicación
          </Link>
        </NavDropdown.Item>

        <NavDropdown.Item className="spanLogin">
          <Link to="publication/admin" className="link">
            Administrar publicaciones
          </Link>
        </NavDropdown.Item>

        <NavDropdown.Item className="spanLogin">
          <Link to="user/admin" className="link">
            Usuarios
          </Link>
        </NavDropdown.Item>

        <NavDropdown.Divider />

        <NavDropdown.Item className="spanLogin">
          <Link to="/user/profile" className="link">
            Mis Datos
          </Link>
        </NavDropdown.Item>

        <NavDropdown.Item className="spanLogin" onClick={logout}>
          Cerrar Sesión
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default MenuAdmin;
