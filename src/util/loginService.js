import { axiosNoToken } from "./axiosConfig";

export const login = async (reqBody, setJwt, setError) => {
  try {
    const response = await axiosNoToken().post("/auth/loginCheck", reqBody);
    await setJwt(response.data.token);
    window.location.href = "/";
  } catch (error) {
    console.log(error.response.data);
    setError(error.response.data);
    console.error("Inicio de sesión fallido");
  }
};
