import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "../../styles/Input.css";

const TextArea = ({ label, error, name, onChange, value, maxLength }) => {
  return (
    <div className="input">
      <Form.Label className="labelForm">
        {label}
        {error && <span className="textError">*{error}</span>}
      </Form.Label>

      <Form.Control
        as="textarea"
        placeholder={label}
        maxLength={maxLength}
        className={"input-form " + name}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
};

export default TextArea;
