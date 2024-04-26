import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/PublicationDetail.css";
import { Modal, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { getRole } from "../../util/securityService";
import { axiosNoToken } from "../../util/axiosConfig";

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
    fetchPublicacion(id);
  }, [id]);

  const fetchPublicacion = async (id) => {
    try {
      const response = await axiosNoToken().get(`/api/publication/${id}`);

      setPublicacion(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la carga de la publicación", error);
    }
  };
  const handleShow = () => (show = true);
  const handleVolver = () => (window.location.href = "/");
  const handleSubscribe = () => (window.location.href = "/user/form");

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
        <div className="categoryDiv">
          <Link
            to={`/category/${publicacion.category.name}`}
            className="linkDetail"
          >
            <h6>{publicacion.category.name}</h6>
          </Link>
        </div>

        <div className="divTitle row">
          <h1>{publicacion.title}</h1>
        </div>
        <div className="divWriter">
          <h6>{publicacion.author.name}</h6>
        </div>
        <div className="divDate col-2">
          <p>{publicacion.creationDate}</p>
        </div>
        <div className="divImage row">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {publicacion.images.map((image) => (
              <Carousel.Item>
                <img className="  " src={image} alt="..." />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="divBody row">
          <p className="bodyNews">{publicacion.body}</p>
        </div>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>EXCLUSIVO PARA SUSCRIPTORES</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Suscribite a nuestro sitio y disfrutá de este contenido y mucho más
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleVolver}>
              Volver
            </Button>
            <Button variant="primary" onClick={handleSubscribe}>
              Suscribirme
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PublicationDetail;
