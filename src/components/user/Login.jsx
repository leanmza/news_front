import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../util/useLocalStorage";
import "../../assets/Login.css";
import BannerLogin from "../banners/BannerLogin";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  // const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const reqBody = {
      email: email,
      password: password,
    };
    fetch("http://localhost:8080/auth/loginCheck", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Inicio de sesión fallido");
      })
      .then(([body, headers]) => {
        setJwt(body.token);
        //con navigate("/") se rompía, se redirigía antes de guardar el jwt
        window.location.href = "/";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="container-fluid divMain">
      <div className="row rowForm login">
        <div className="col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <BannerLogin></BannerLogin>
        </div>
        <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 col-xxl-4  offset-xl-2">
          <div className="form-outline mb-4">
            <Input
              label={"Email"}
              type={"email"}
              name={"email"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="form-outline mb-3">
            <Input
              label={"Contraseña"}
              type={"password"}
              name={"password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="form-outline mb-3">
            <p>
              ¿No tenés cuenta?{" "}
              <Link to="/user/form" className="link">
                <span className="spanRegis">Registrate acá</span>
              </Link>{" "}
            </p>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <div className="divButton">
              <Button
                type={"submit"}
                variant={"primary"}
                onClick={handleSubmit}
                text={"Iniciar Sesión"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
