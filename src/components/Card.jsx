import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ item, className}) => {

  const {id, title, category, images} = item
  const coverImage = images && images.length > 0 ? images[0].imageUrl : null;

  return (
    <div className={className}>
      <div className="card h-100">
        <img className="card-img-top cardImg" alt="..." src={coverImage} />

        <div className="card-img-overlay">
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

Card.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({ imageUrl: PropTypes.string })
    ),
  }).isRequired,
};

export default Card;
