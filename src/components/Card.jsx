import React from "react";
import { Link } from "react-router-dom";
import "../assets/Card.css";

const Card = ({ item, className}) => {

  const {id, title, header, category, subscriberContent, images} = item

  return (
    <div className={className}>
      <div className="card h-100">
        <img className="card-img-top cardImg" alt="..." src={images[0].imageUrl} />

        <div className="card-img-overlay">
          {subscriberContent && ( // Verifica si subscriberContent es true
            <div className="exclusivo">
              <span className="subscriber-content-info">
                Exclusivo suscriptores
              </span>
            </div>
          )}
          <div className="cardTitulo">
                <Link to={`/publication/category/${category}`} className="link">
              <h6 className="card-category">{category}</h6>
            </Link>

            <Link to={`/publication/${id}`} className="link">
              <h2 className="card-title">{title}</h2>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
