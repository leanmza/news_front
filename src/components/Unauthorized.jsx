import React from "react";
import error from "../assets/img/401-error.png";
import '../assets/Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="container-fluid form">
      <img src={error} className="imgError" alt="Sample image" />
    </div>
  );
};

export default Unauthorized;
