import axios from 'axios';

export const getCategories = async (setCategories) => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    setCategories(response.data.categories);
  } catch (error) {
    console.error("Error en la carga de categorias", error);
  }
};