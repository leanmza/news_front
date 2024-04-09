import React from "react";

const PublicationAdmin = ({publicaciones}) => {
    console.log(publicaciones);
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
            <th scope="col" className="col-">
              Fecha
            </th>
            <th scope="col" className="col-">
              Suscriptores
            </th>
            <th scope="col" className="col-">
              Vistas
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
            <tr>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>{item.category.name}</td>
            <td>{item.author.name}</td>
            <td>{item.creationDate}</td>
            <td>{item.subscriberContent ? "Sí" : "No"}</td>
            <td>{item.visualizations}</td>
            <td>{item.images}</td>
            <td>
              <div className="col-12">
                <a  className="link">
                  <i className="fa-regular fa-pen-to-square"></i>
                </a>

                <a className="link">
                  <i className="fa-solid fa-trash-can"></i>
                </a>
              </div>
            </td>
            </tr>
          ))}
            
            
         
        </tbody>
      </table>
    </div>
  );
};

export default PublicationAdmin;
