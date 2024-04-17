import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  if (typeof window !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    let token;
    if (jwt !== null) {
      token = eliminarComillas(jwt);
      return token;
    } else {
      return null;
    }
  }
};

export const cleanToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
};

export const getRole = () => {
  const token = getToken();
  let role;
  if (token !== null) {
    role = jwtDecode(token).authorities[0];
  } else {
    role = "ANONYMOUS";
  }
  return role;
};

export const validToken = () => {
  const currentTime = Date.now() / 1000; // Tiempo actual en segundos

  if (jwtDecode(getToken()).exp < currentTime) {
    return false;
  } else {
    return true;
  }
};

function eliminarComillas(cadena) {
  return cadena.replace(/"/g, "");
}
//Revisar como se guarda y si hay jwt para eliminar comillas
