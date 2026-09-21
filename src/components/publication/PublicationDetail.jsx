import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/PublicationDetail.css";
import { Carousel } from "react-bootstrap";
import { getRole } from "../../util/securityService";
import ModalExclusive from "../modals/ModalExclusive";
import { getPublicacion, formatDate } from "../../util/publicationService";
import FloatinButton from "./../common/FloatinButton";


const PublicationDetail = () => {
  const [publicacion, setPublicacion] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  // NOTA: "show" queda siempre en false porque nunca se implementó la lógica
  // que decide cuándo una publicación es exclusiva para suscriptores. El modal
  // ModalExclusive existe pero no se dispara desde ningún lado. Falta definir
  // esa regla de negocio (ej: publicacion.exclusive) para terminar la feature.
  const [show] = useState(false);

  const role = getRole();

  const [index, setIndex] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPublicacion(id, setPublicacion, setIsLoading);
  }, [id]);


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleVolver = () => navigate("/");
  const handleSubscribe = () => navigate("/user/login");

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga mientras se está cargando la publicación
  }



  return (
    <div>
      <div className="container-fluid divNews">
        <div className="divInfo row">
          <Link
            to={`/publication/category/${publicacion.category}`}
            className="linkDetail col-2"
          >
            <span className="categoryDetail">{publicacion.category}</span>
          </Link>

          <h1>{publicacion.title}</h1>

          <span className=" col-2">
            por: <span className="author">{publicacion.author}</span>
          </span>
          <span className="date col-2">
            {formatDate(publicacion.creationDate)}
          </span>
        </div>

        <div className="divImage">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {(publicacion.images || []).map((image) => (
              <Carousel.Item key={image.id}>
                <img className="imgHorizontal" src={image.imageUrl} alt="..." />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="divEncabezado row">
          <h5 className="encabezadoNews">{publicacion.header}</h5>
        </div>
        <div className="divBody row">
          <p className="bodyNews">{publicacion.body}</p>
        </div>

        <ModalExclusive
          show={show}
          handleVolver={handleVolver}
          handleSubscribe={handleSubscribe}
        />
      </div>
      {role === "ADMIN" ? (
        <Link to={`/publication/edit/${publicacion.id}`} className="col-1">
          <FloatinButton />
        </Link>
      ) : null}
    </div>
  );
};

export default PublicationDetail;
