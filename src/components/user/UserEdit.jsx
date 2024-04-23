import React, { useEffect, useState } from "react";
import "../../assets/PublicationForm.css";
import axios from "axios";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import BannerLogin from "../BannerLogin";

import { getUserName, getToken } from "./../../util/securityService";

const UserEdit = () => {
  const userName = getUserName();

  const [user, setUserData] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUser(userName);
  }, []);

  const token = getToken();

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  const fetchUser = async (userName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/${userName}`,
        headers
      );

      setUserData({
        id: response.data.id,
        name: response.data.name,
        lastName: response.data.lastName,
        email: response.data.email,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error en la carga del usuario", error);
    }
  };
  const [loading, setLoading] = useState(false);

  function handleInputForm(event) {
    const { name, value } = event.target;

    const inputValue = value;

    setUserData({
      ...user,
      [name]: inputValue,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log("handleSubmit");
    console.log("user", user);

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/users/${user.id}`,
        user,
        headers
      );
      console.log(response.status, "usuario actualizado");
      window.location.href = "/";
    } catch (error) {
      console.error("Hubo un error", error);
    } finally {
      setLoading(false); // Ocultar preloader al finalizar la solicitud
    }
  };

  return (
    <div className="container-fluid divMain">
      <div className="row rowForm">
        <div className="col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <BannerLogin></BannerLogin>
        </div>
        <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 col-xxl-4  offset-xl-2">
          <h1 className="titulo col-12">Mis Datos</h1>

          <form>
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  onChange={handleInputForm}
                  value={user.name}
                />
              </FloatingLabel>
            </div>
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Apellido"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  name="lastName"
                  onChange={handleInputForm}
                  value={user.lastName}
                />
              </FloatingLabel>
            </div>
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleInputForm}
                  value={user.email}
                  readOnly
                />
              </FloatingLabel>
            </div>
            <div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Contraseña"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleInputForm}
                    value={user.password}
                  />
                </FloatingLabel>
              </div>

            <div className="divButton">
              <button
                type="submit"
                className="btn btn-primary btn-lg btnSubmit"
                onClick={handleSubmit}
              >
                Guardar Cambios
              </button>
            </div>
            {loading && (
              <div className="text-center mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Guardando cuenta</span>
                </Spinner>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
