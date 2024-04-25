import axios from 'axios';
import { getToken } from './securityService';

const token = getToken();


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // URL base
  headers: {
    // Authorization: `Bearer ${token}`, // Autorización global
    // Accept: 'application/json', // Tipo de contenido aceptado
  },
});

export default axiosInstance;


