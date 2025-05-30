import axios from "axios";
import { getToken } from "./securityService";

export const axiosNoToken = () =>
  axios.create({
    baseURL: "http://localhost:8080", // URL base
    headers: {},
  });

export const axiosToken = () =>
  axios.create({
    baseURL: "http://localhost:8080", // URL base
    headers: { Authorization: `Bearer ${getToken()}`, Accept: "application/json" },
  });
