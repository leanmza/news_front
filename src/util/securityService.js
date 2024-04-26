import { jwtDecode } from "jwt-decode";

let token = null;
let role = "ANONYMOUS";

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
    return role;
  } else {
    role = jwtDecode(token).authorities[0];
    return role;
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

export const getUserName = () => {
  return jwtDecode(token).sub;
};

function eliminarComillas(cadena) {
  return cadena.replace(/"/g, "");
}
//Revisar como se guarda y si hay jwt para eliminar comillas
