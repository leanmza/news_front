import React, { useEffect, useState } from "react";
import "../../assets/PublicationForm.css";
import { Spinner } from "react-bootstrap";
import BannerLogin from "../banners/BannerLogin";
import { getUserName } from "./../../util/securityService";
import { axiosToken } from "../../util/axiosConfig";
import Input from "../common/Input";
import Button from "../common/Button";

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

  const fetchUser = async (userName) => {
    try {
      const response = await axiosToken().get(`/api/users/${userName}`);

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
      const response = await axiosToken().patch(`/api/users/${user.id}`, user);
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
              <Input
                label={"Nombre"}
                type={"text"}
                name={"name"}
                onChange={handleInputForm}
                value={user.name}
              />
            </div>
            <div>
              <Input
                label={"Apellido"}
                type={"text"}
                name={"lastName"}
                onChange={handleInputForm}
                value={user.lastName}
              />
            </div>
            <div>
              <Input
                label={"Email"}
                type={"email"}
                name={"email"}
                onChange={handleInputForm}
                value={user.email}
              />
            </div>
            <div>
              <Input
                label={"Contraseña"}
                type={"password"}
                name={"password"}
                onChange={handleInputForm}
                value={user.password}
              />
            </div>

            <div className="divButton">
            <Button
                type={"submit"}
                variant={"primary"}
                onClick={handleSubmit}
                text={"Guardar Cambios"}
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

export default UserEdit;
