import React, { useState, useEffect } from "react";
import { axiosNoToken } from './../../util/axiosConfig';
import "../../assets/UsersAdmin.css";
import { sortBy } from "../../util/listSort";

const UsersAdmin = () => {
  const [userList, setUserList] = useState([]);

  const [ordenInverso, setOrdenInverso] = useState(false);

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

  const handleSort = (e) => {
    const sortValue = e.target.getAttribute('value');
    const sortedUsers = sortBy([...userList], sortValue, ordenInverso);
    setUserList(sortedUsers);
    // Invierte el estado del orden
    setOrdenInverso(!ordenInverso);
  };

  return (
    <div className="container-fluid divAdmin">
      <table className="table row-col-12 table-light newsTable" id="newsTable">
        <thead>
          <tr className="row-col-12 titulosTabla">
            <th scope="col" className="col-2"  onClick={handleSort}
              value="name">
              Nombre
            </th>
            <th scope="col" clas="col-2"  onClick={handleSort}
              value="lastName">
              Apellido
            </th>
            <th scope="col" className="col- col-md-1"  onClick={handleSort}
              value="email">
              Email
            </th>
            <th scope="col" className="col- col-md-1"  onClick={handleSort}
              value="rol">
              Rol
            </th>
            <th scope="col" className="col-"  onClick={handleSort}
              value="active">
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
