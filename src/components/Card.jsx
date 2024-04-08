import React from "react";
import { Link } from "react-router-dom";
import "../assets/Card.css";

const Card = ({
  id,
  title,
  body,
  creationDate,
  author,
  category,
  subscriberContent,
  visualizations,
  image,
}) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 colCard">
      <div className="card h-100">
        <img className="card-img-top cardImg" alt="..." src={image} />

        <div className="card-img-overlay">
          {subscriberContent && ( // Verifica si subscriberContent es true
            <span className="subscriber-content-info">
              Exclusivo suscriptores
            </span>
          )}
          <Link to="/" {...category} className="link">
            <h6 className="card-category">{category}</h6>
          </Link>

          <Link to={id} className="link">
            <h2 className="card-title">{title}</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
