import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = eliminarComillas(localStorage.getItem("jwt"));
    return token !== null ? token : null;
  }
};

export const cleanToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
};

export const getRole = () => {
  const role = jwtDecode(getToken()).authorities[0];
  return role !== null ? role : null;
};

function eliminarComillas(cadena) {
  return cadena.replace(/"/g, "");
}
