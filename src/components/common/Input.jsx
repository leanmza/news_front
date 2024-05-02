import React from 'react'
import { FloatingLabel, Form } from "react-bootstrap";

const Input = ({label, type, name, onChange, value}) => {
  return (
    <>
       <FloatingLabel
              controlId="floatingInput"
              label={label}
              className="mb-3"
            >
              <Form.Control
                type={type}
                placeholder={label} //Mismo que label
                name={name}
                onChange={onChange}
                value={value} 
              />
            </FloatingLabel>
    </>
  )
}

export default Input
