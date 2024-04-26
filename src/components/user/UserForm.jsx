import React, { useState } from "react";
import "../../assets/PublicationForm.css";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import BannerLogin from "../BannerLogin";
import { axiosNoToken } from "../../util/axiosConfig";

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

    try {
      const response = await axiosNoToken().post("/api/users/create", user);
      console.log(response.status, "usuario registrado");
      window.location.href = "/user/login";
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
          <h1 className="titulo col-12">Crear Cuenta</h1>

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
                Registrame
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

export default UserForm;
