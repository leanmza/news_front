import React from "react";
import { Form } from "react-bootstrap";
import "../../assets/Input.css";

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

export default InputSelect;
