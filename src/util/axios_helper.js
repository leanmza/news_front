import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.auth = `Bearer ${token}`;

const token = eliminarComillas(localStorage.getItem("jwt"));

function eliminarComillas(cadena) {
  return cadena.replace(/"/g, "");
}


export const request = (method, url, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    });
};