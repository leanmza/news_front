import React, { useState, useEffect } from "react";
import { axiosNoToken } from './../../util/axiosConfig';

const UsersAdmin = () => {
  const [userList, setUserList] = useState([]);
  // const [showModal, setShowModal] = useState({});

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axiosNoToken().get("/api/users");
      setUserList(response.data.users);
    } catch (error) {
      console.error("Error en la carga de categorías ", error);
    }
  };

  // const handleClose = (itemId) =>
  //   setShowModal({ ...showModal, [itemId]: false });
  // const handleShow = (itemId) => setShowModal({ ...showModal, [itemId]: true });

  return (
    <div>
      <table className="table row-col-12 table-light newsTable" id="newsTable">
        <thead>
          <tr className="row-col-12 titulosTabla">
            <th scope="col" className="col-2">
              Nombre
            </th>
            <th scope="col" clas="col-2">
              Apellido
            </th>
            <th scope="col" className="col- col-md-1">
              Email
            </th>
            <th scope="col" className="col- col-md-1">
              Rol
            </th>
            <th scope="col" className="col-">
              Activo
            </th>
          </tr>
        </thead>

        <tbody>
          {userList.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.rol}</td>
              <td>{item.active ? "Activo" : "De baja"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;
