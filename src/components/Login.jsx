import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import "../assets/Login.css";
import BannerLogin from "./BannerLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

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
        setJwt(body.token); // Asignar el token a la variable jwtToken
        console.log("jwt " + jwt);
        window.location.href = "/";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="container-fluid divMain">
      <div className="row rowForm">
        <div className="col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <BannerLogin></BannerLogin>
        </div>
        <div className="col-sm-9 col-md-8 col-lg-6 col-xl-5 col-xxl-4  offset-xl-2">
          <form onSubmit={handleSubmit} className="form" id="formLogin">
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label">Email</label>
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Contraseña</label>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="submit"
                className="btn btn-primary btn-lg btnSubmit"
                id="btnSubmit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
