import { useState, useEffect } from "react";
import "../assets/HorizontalCard.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HorizontalCard = ({ ultimas }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  console.log("ultimas");
  console.log(ultimas);

  return (
    <div className="divHorizontalImg">
      {ultimas && ultimas.length > 0 && (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="carrousel"
        >
          {ultimas.map((publicacion) => (
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
