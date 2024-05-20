import React from "react";
import { Form } from "react-bootstrap";
import "../../assets/Input.css";

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

export default TextArea;
