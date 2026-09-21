import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/Carrousel.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Carrousel = ({ lastPublications }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section className="ultimas-publicaciones">
      {lastPublications && lastPublications.length > 0 && (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className=" carrousel-container "
        >
          {lastPublications.map((publicacion) => {
            const coverImage =
              publicacion.images && publicacion.images.length > 0
                ? publicacion.images[0].imageUrl
                : null;
            return (
              <Carousel.Item key={publicacion.id}>
                <Carousel.Caption>
                  <Link to={`/publication/${publicacion.id}`} className="link">
                    <h6 className="categoryHorizontal">{publicacion.category}</h6>
                    <h2 className="titleHorizontal">{publicacion.title}</h2>
                  </Link>
                </Carousel.Caption>
                <img
                  className="imgHorizontal"
                  src={coverImage}
                  alt="..."
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </section>
  );
};

Carrousel.propTypes = {
  lastPublications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category: PropTypes.string,
      title: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.shape({ imageUrl: PropTypes.string })
      ),
    })
  ),
};

export default Carrousel;
