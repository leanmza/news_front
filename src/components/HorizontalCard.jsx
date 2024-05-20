import { useState, useEffect } from "react";
import "../assets/HorizontalCard.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HorizontalCard = ({ lastPublications }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="ultimas-publicaciones">
      {lastPublications && lastPublications.length > 0 && (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className=" carrousel "
        >
          {lastPublications.map((publicacion) => (
            <Carousel.Item>
              <Carousel.Caption>
                <Link to={`/publication/${publicacion.id}`} className="link">
                  <h6 className="categoryHorizontal">{publicacion.category}</h6>
                  <h2 className="titleHorizontal">{publicacion.title}</h2>
                  {publicacion.subscriberContent && ( // Verifica si subscriberContent es true
                    <span className="subscriber-content-info">
                      Exclusivo suscriptores
                    </span>
                  )}
                </Link>
              </Carousel.Caption>
              <img
                className="imgHorizontal"
                src={publicacion.images[0].imageUrl}
                alt="..."
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default HorizontalCard;
