import { jwtDecode } from "jwt-decode";

// NOTA DE SEGURIDAD: el JWT se guarda en localStorage, lo que lo expone a robo
// vía XSS. La forma más segura sería una cookie httpOnly seteada por el backend,
// pero eso requiere coordinar el cambio con la API (no se puede resolver solo
// desde el frontend). Mientras tanto, este servicio siempre lee el valor
// directamente de localStorage en vez de cachearlo en variables de módulo, para
// evitar que quede desincronizado entre pestañas o después de un logout.

export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const jwt = localStorage.getItem("jwt");
  return jwt !== null ? eliminarComillas(jwt) : null;
};

export const cleanToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
};

export const getRole = () => {
  const token = getToken();
  if (!token) {
    return "ANONYMOUS";
  }
  try {
    return jwtDecode(token).authorities[0];
  } catch (error) {
    console.error("Token inválido al leer el rol", error);
    return "ANONYMOUS";
  }
};

export const validToken = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  try {
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    return jwtDecode(token).exp >= currentTime;
  } catch (error) {
    console.error("Token inválido", error);
    return false;
  }
};

export const getUserName = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  try {
    return jwtDecode(token).sub;
  } catch (error) {
    console.error("Token inválido al leer el usuario", error);
    return null;
  }
};

function eliminarComillas(cadena) {
  return cadena.replace(/"/g, "");
}
