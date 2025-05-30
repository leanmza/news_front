import React from "react";
import { Form } from "react-bootstrap";
import "../../assets/Input.css";

const Input = ({ label, error, type, name, onChange, value }) => {
  return (
    <div className="input">
      <Form.Label className="labelForm">
        {label}
        {error && <span className="textError">*{error}</span>}
      </Form.Label>
      <Form.Control
        className="input-form"
        type={type}
        placeholder={label} //Mismo que label
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
