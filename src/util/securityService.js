import { jwtDecode } from "jwt-decode";

let token = null;

export const getToken = () => {
  if (typeof window !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      token = eliminarComillas(jwt);
      return token;
    }
  }
};

export const cleanToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    token = null;
  }
};

export const getRole = () => {
  if (token === null || token === "") {
    return "ANONYMOUS";
  } else {
    return jwtDecode(token).authorities[0];
  }
};

export const validToken = () => {

  const currentTime = Date.now() / 1000; // Tiempo actual en segundos

  if (jwtDecode(token).exp < currentTime) {
    return false;
  } else {
    return true;
  }
};

function eliminarComillas(cadena) {
  return cadena.replace(/"/g, "");
}
//Revisar como se guarda y si hay jwt para eliminar comillas
