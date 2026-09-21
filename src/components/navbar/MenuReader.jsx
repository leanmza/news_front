import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuReader = ({ logout }) => {
  return (
    <div>
      <NavDropdown
        id="nav-dropdown-dark-example"
        className="spanLogin"
        title="Cuenta"
      >
        <NavDropdown.Item className="spanLogin">
          <Link to="/user/profile" className="link">
            Mis Datos
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item className="spanLogin" onClick={logout}>
          Cerrar Sesión
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

MenuReader.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default MenuReader;
