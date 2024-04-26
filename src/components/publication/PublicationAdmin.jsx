import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { axiosNoToken } from "../../util/axiosConfig";

const PublicationAdmin = ({ deletePublication }) => {
  const [showModal, setShowModal] = useState({});

  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axiosNoToken().get("/api/publication/all");
      setPublicaciones(response.data.publications);
    } catch (error) {
      console.error("Error en la carga de categorías", error);
    }
  };

  const handleClose = (itemId) =>
    setShowModal({ ...showModal, [itemId]: false });
  const handleShow = (itemId) => setShowModal({ ...showModal, [itemId]: true });

  return (
    <div>
      <table className="table row-col-12 table-light newsTable" id="newsTable">
        <thead>
          <tr className="row-col-12 titulosTabla">
            <th scope="col" className="col-2">
              Título
            </th>
            <th scope="col" clas="col-2">
              Cuerpo
            </th>
            <th scope="col" className="col- col-md-1">
              Categoría
            </th>
            <th scope="col" className="col- col-md-1">
              Autor
            </th>
            <th scope="col" className="">
              Fecha
            </th>
            <th scope="col" className="">
              Suscriptores
            </th>
            <th scope="col" className="">
              Vistas
            </th>
            <th scope="col" className="col">
              Estado
            </th>
            <th scope="col" className="col-3">
              Imágenes
            </th>
            <th scope="col" className="col-1 col-md-1">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {publicaciones.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>{item.category.name}</td>
              <td>{item.author.name}</td>
              <td>{item.creationDate}</td>
              <td>{item.subscriberContent ? "Sí" : "No"}</td>
              <td>{item.visualizations}</td>
              <td>{item.deleted ? "Oculta" : "Activa"}</td>
              <td>{item.images}</td>
              <td>
                <div className="col-12">
                  <Link to={`/publication/edit/${item.id}`}>
                    <span class="material-symbols-outlined">edit</span>
                  </Link>

                  <span
                    className="material-symbols-outlined link"
                    onClick={() => handleShow(item.id)}
                  >
                    delete
                  </span>
                </div>
                <Modal
                  show={showModal[item.id]}
                  onHide={() => handleClose(item.id)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Borrar Publicación</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    ¿Desea borrar la publicación {item.title}?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => handleClose(item.id)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={async () => {
                        await deletePublication(item.id);
                        await fetchPublications();
                        handleClose(item.id);
                      }}
                    >
                      Borrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublicationAdmin;
