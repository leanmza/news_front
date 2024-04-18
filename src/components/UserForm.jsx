import React, { useEffect, useState } from "react";
import "../assets/PublicationForm.css";
import axios from "axios";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";

const UserForm = () => {
  const [user, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

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

    console.log(user);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/create",
        user
      );
      console.log(response.status, "usuario registrado");
      window.location.href = "/";
    } catch (error) {
      console.error("Hubo un error", error);
    } finally {
      setLoading(false); // Ocultar preloader al finalizar la solicitud
    }
  };

  return (
    <div className="container-fluid form">
      <h1 className="titulo col-12">Nueva Publicación</h1>
      <div className="col-md-10 col-lg-8">
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
              />
            </FloatingLabel>
          </div>

          <div className="divButton">
            <button
              type="submit"
              className="btn btn-primary btn-lg btnSubmit"
              onClick={handleSubmit}
            >
              Guardar Publicación
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
  );
};

export default UserForm;
