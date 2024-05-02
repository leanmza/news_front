import React from "react";

const Button = ({ type, variant, onClick, text }) => {
  return (
    <>
      <button
        type={type}
        className={`btn btn-${variant} btn-lg btnSubmit`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
