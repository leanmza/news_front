import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/PublicationDetail.css";
import { Carousel } from "react-bootstrap";
import { getRole } from "../../util/securityService";
import ModalExclusive from "../modals/ModalExclusive";
import { getPublicacion, formatDate } from "../../util/publicationService";
import FloatinButton from "./../common/FloatinButton";

const PublicationDetail = () => {
  const [publicacion, setPublicacion] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  let show = false;

  const role = getRole();

  //Seteo index para el carrousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const { id } = useParams();

  useEffect(() => {
    getPublicacion(id, setPublicacion, setIsLoading);
  }, [id]);

  const handleShow = () => (show = true);
  const handleVolver = () => (window.location.href = "/");
  const handleSubscribe = () => (window.location.href = "/user/login");

  //PONER MODAL CON FONDO DIFUMINADO
  if (role === "ANONYMOUS" && publicacion.subscriberContent == true) {
    handleShow();
  }

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

          <span className=" col-2">por: <span className="author">{publicacion.author}</span></span>
          <span className="date col-2">
            {formatDate(publicacion.creationDate)}
          </span>

        </div>


        <div className="divImage">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {publicacion.images.map((image) => (
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
