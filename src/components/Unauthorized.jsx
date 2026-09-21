import error from "../assets/img/401-error.png";
import '../styles/Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="container-fluid form">
      <img src={error} className="imgError" alt="Sample image" />
    </div>
  );
};

export default Unauthorized;
