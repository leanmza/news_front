import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/PublicationDetail.css";
import { Carousel } from "react-bootstrap";
import { getRole } from "../../util/securityService";
import { axiosNoToken } from "../../util/axiosConfig";
import ModalExclusive from "../modals/ModalExclusive";

const PublicationDetail = ({ deletePublication }) => {
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
        <div className="categoryDiv row">
          <Link
            to={`/category/${publicacion.category.name}`}
            className="linkDetail col-2"
          >
            <h6 className="categoryDetail">{publicacion.category.name}</h6>
          </Link>
          {role === "ADMIN" ? (
            <Link to={`/publication/edit/${publicacion.id}`}>
              <span className="material-symbols-outlined">edit</span>
            </Link>
          ) : null}
        </div>

        <div className="divTitle row">
          <h1>{publicacion.title}</h1>
        </div>
        <div className="divWriter row">
          <h6>{publicacion.author.name}</h6>
        </div>
        <div className="divDate col-2 row">
          <p>{publicacion.creationDate}</p>
        </div>

        <div className="divImage row">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {publicacion.images.map((image) => (
              <Carousel.Item>
                <img className="imgHorizontal" src={image} alt="..." />
              </Carousel.Item>
            ))}
          </Carousel>
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
    </div>
  );
};

export default PublicationDetail;
