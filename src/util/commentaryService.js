import { axiosToken } from "./axiosConfig";

export const postComment = async (comment, setError) => {
  try {
    await axiosToken().post("/api/comment/create", comment);
  } catch (error) {
    console.error("Error al crear el comentario", error);
    setError(error.response?.data);
  }
};