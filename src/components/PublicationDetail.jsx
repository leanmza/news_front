import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../assets/PublicationDetail.css";

import { Carousel } from "react-bootstrap";

const PublicationDetail = () => {
  const [publicacion, setPublicacion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Seteo index para el carrousel
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const { id } = useParams();

  //Configuro el header de la solicitud
  const headers = {
    headers: {
      Accept: "application/json",
    },
  };

  //Obtengo el token
  let token = localStorage.getItem("jwt");
  
  if (token !== null) {
    token = token.replace(/"/g, "");
    headers.headers.Authorization = `Bearer ${token}`; // Agrego el token al Authorization del headers
  }


  useEffect(() => {
    fetchPublicacion(id);
  }, [id]);

  const fetchPublicacion = async (id) => {
    try {
      console.log("try");
      const response = await axios.get(
        `http://localhost:8080/api/publication/${id}`,
        headers
      );

      setPublicacion(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la carga de la publicación", error);
    }
  };


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
      </div>
    </div>
  );
};

export default PublicationDetail;
