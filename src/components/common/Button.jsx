import React from "react";
import "../../assets/Button.css"

const Button = ({ type, variant, onClick, text }) => {
  return (
    <>
      <button
        type={type}
        className={`btn btn-${variant} btn-lg button`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
