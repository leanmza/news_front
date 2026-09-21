import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "../../styles/Input.css";

const InputImage = ({ label, name, onChange, error }) => {
  return (
    <div className="input">
      <Form.Label className="labelForm">
        {label}
        {error && <span className="textError">*{error}</span>}
      </Form.Label>
      <Form.Control
        className="input-form"
        name={name}
        onChange={onChange}
        type="file"
        accept="image/*"
        multiple
      />
    </div>
  );
};

InputImage.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default InputImage;
