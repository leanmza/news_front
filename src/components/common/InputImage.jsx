import React from "react";
import { Form } from "react-bootstrap";
import "../../assets/Input.css";

const InputImage = ({ label, name, onChange }) => {
  return (
    <div className="input">
      <Form.Label className="labelForm">{label}</Form.Label>

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

export default InputImage;
