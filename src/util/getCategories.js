import { axiosNoToken } from "./axiosConfig";

export const getCategories = async (setCategories) => {
  try {
    const response = await axiosNoToken().get("/api/categories");
    setCategories(response.data.categories);
  } catch (error) {
    console.error("Error en la carga de categorias", error);
  }
};
