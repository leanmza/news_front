import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "../../styles/Input.css";

const Input = ({
  className = "",
  label,
  error,
  type,
  name,
  onChange,
  value,
}) => {
  return (
    <div className="input">
      <Form.Label className="labelForm">
        {label}
        {error && <span className="textError">*{error}</span>}
      </Form.Label>
      <Form.Control
        className={`input-form ${className}`}
        type={type}
        placeholder={label} //Mismo que label
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Input;
