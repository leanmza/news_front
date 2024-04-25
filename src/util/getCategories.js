import axios from 'axios';
import axiosInstance from './axiosConfig';


export const getCategories = async (setCategories) => {
  try {
    const response = await axiosInstance.get("/api/categories");
    setCategories(response.data.categories);
  } catch (error) {
    console.error("Error en la carga de categorias", error);
  }
};