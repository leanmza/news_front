import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../assets/PublicationAdmin.css";
import { sortBy } from "../../util/listSort";
import ModalAdmin from "./../modals/ModalAdmin";
import {
  changeStatus,
  deletePublicationById,
  getAllPublications,
  formatDate
} from "../../util/publicationService";

const PublicationAdmin = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  const [ordenInverso, setOrdenInverso] = useState(false);

  const [show, setShow] = useState(false);

  const [action, setAction] = useState();

  const [item, setItem] = useState();

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    getAllPublications(setPublicaciones);
  };

  const handleClose = () => setShow(false);

  const handleShow = (item, actionValue) => {
    setShow(true);
    setAction(actionValue);
    setItem(item);
  };

  const handleSort = (e) => {
    const sortValue = e.target.getAttribute("value");
    const sortedPublicaciones = sortBy(
      [...publicaciones],
      sortValue,
      ordenInverso
    );
    setPublicaciones(sortedPublicaciones);
    // Invierte el estado del orden
    setOrdenInverso(!ordenInverso);
  };

  const deletePublication = async (id) => {
    deletePublicationById(id, setPublicaciones);
    fetchPublications();
  };

  const changeDeletedStatus = async (id) => {
    changeStatus(id, setPublicaciones);
    fetchPublications();
  };


  return (
    <div className="container-fluid divAdmin">
      <table className="table row-col-12 table-light newsTable" id="newsTable">
        <thead>
          <tr className="row-col-12 titulosTabla">
            <th
              scope="col"
              className="col-2"
              onClick={handleSort}
              value="title"
            >
              Título
            </th>
            <th scope="col" className="col-2">
              Encabezado
            </th>
            <th scope="col" className="col-3">
              Cuerpo
            </th>
            <th
              scope="col"
              className="col col-md-1"
              onClick={handleSort}
              value="category"
            >
              Categoría
            </th>
            <th
              scope="col"
              className="col col-md-1"
              onClick={handleSort}
              value="author"
            >
              Autor
            </th>
            <th
              scope="col"
              className="col"
              onClick={handleSort}
              value="creationDate"
            >
              Fecha
            </th>
            <th
              scope="col"
              className="col"
              onClick={handleSort}
              value="subscriberContent"
            >
              Suscriptores
            </th>
            <th
              scope="col"
              className="col"
              onClick={handleSort}
              value="visualizations"
            >
              Vistas
            </th>
            <th
              scope="col"
              className="col"
              onClick={handleSort}
              value="deleted"
            >
              Estado
            </th>
            <th scope="col" className="col-2">
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
              <td>{item.header}</td>
              <td>
                <p className="tableBody">{item.body}</p>
              </td>
              <td>{item.category}</td>
              <td>{item.author}</td>
              <td>{formatDate(item.creationDate)}</td>
              <td>{item.subscriberContent ? "Sí" : "No"}</td>
              <td>{item.visualizations}</td>
              <td>
                {item.deleted ? (
                  <span
                    className="material-symbols-outlined noVisible icons"
                    onClick={() => handleShow(item, "changeStatus")}
                  >
                    visibility_off
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined visible icons"
                    onClick={() => handleShow(item, "changeStatus")}
                  >
                    visibility
                  </span>
                )}
              </td>
              <td>
                {item.images.map((image) => (
                  <img
                    key={image.id}
                    className="miniImg"
                    src={image.imageUrl}
                    alt="..."
                  />
                ))}
              </td>
              <td>
                <div className="col-12 icons">
                  <Link to={`/publication/edit/${item.id}`}>
                    <span className="material-symbols-outlined">edit</span>
                  </Link>

                  <span
                    className="material-symbols-outlined link"
                    onClick={() => handleShow(item, "delete")}
                  >
                    delete
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAdmin
        show={show}
        item={item}
        action={action}
        handleClose={handleClose}
        deletePublication={deletePublication}
        changeDeletedStatus={changeDeletedStatus}
        fetchPublications={fetchPublications}
      />
    </div>
  );
};

export default PublicationAdmin;
