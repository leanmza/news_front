import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import "../../styles/Input.css";

const InputSelect = ({ label, error, name, onChange, categories, value }) => {
  return (
    <div className="input">
      <Form.Label className="labelForm">
        {label}
        {error && <span className="textError">*{error}</span>}
      </Form.Label>

      <Form.Select
        name={name}
        onChange={onChange}
        value={value}
        className="input-form"
      >
        <option>Elegir una categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

InputSelect.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default InputSelect;
