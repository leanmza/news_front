import React, { useState } from "react";
import "../../assets/PublicationForm.css";
import { Spinner } from "react-bootstrap";
import BannerLogin from "../banners/BannerLogin";
import Input from "../common/Input";
import Button from "../common/Button";
import { createUser } from "../../util/publicationService";

const UserForm = () => {
  const [user, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

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

    createUser(user, setLoading, setError);
  };

  return (
    <div className="container-fluid divMain">
      <div className="row rowForm login">
        <div className="col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <BannerLogin />
        </div>
        <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 col-xxl-4  offset-xl-2">
          <h1 className="titulo col-12">Crear Cuenta</h1>

          <form>
            <div>
              <Input
                label={"Nombre"}
                type={"text"}
                name={"name"}
                onChange={handleInputForm}
                error={error.name}
              />
            </div>
            <div>
              <Input
                label={"Apellido"}
                type={"text"}
                name={"lastName"}
                onChange={handleInputForm}
                error={error.lastName}
              />
            </div>
            <div>
              <Input
                label={"Email"}
                type={"email"}
                name={"email"}
                onChange={handleInputForm}
                error={error.email}
              />
            </div>
            <div>
              <Input
                label={"Contraseña"}
                type={"password"}
                name={"password"}
                onChange={handleInputForm}
                error={error.password}
              />
            </div>

            <div className="divButton">
              <Button
                type={"submit"}
                variant={"primary"}
                onClick={handleSubmit}
                text={"Registrarme"}
              />
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
