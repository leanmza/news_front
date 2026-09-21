import PropTypes from "prop-types";
import "../../styles/Button.css"

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

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.node,
};

export default Button;
