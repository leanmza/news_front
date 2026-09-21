import { axiosNoToken } from "./axiosConfig";

export const login = async (reqBody, setJwt, setError) => {
  try {
    const response = await axiosNoToken().post("/auth/loginCheck", reqBody);
    setJwt(response.data.token);
    window.location.href = "/";
  } catch (error) {
    console.error("Inicio de sesión fallido", error);
    setError(error.response?.data);
  }
};
