import React, { useState, useEffect } from "react";

import axios from "axios";
import { getToken } from "./../../util/securityService";

const UserAdmin = () => {
  const [userList, setUserList] = useState([]);
  // const [showModal, setShowModal] = useState({});

  const token = getToken();

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
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

export default UserAdmin;
