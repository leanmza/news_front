import axios from "axios";
import { getToken } from "./securityService";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const axiosNoToken = () =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {},
  });

export const axiosToken = () =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${getToken()}`, Accept: "application/json" },
  });
