import { axiosNoToken, axiosToken } from "./axiosConfig";

//En este servicio se encuentran todos las peticiones GET, DELETE, PATCH Y POST de publication

//        SOLICITUDES GET

export const getPublications = async (setPublicaciones) => {
  //Trae todas las publicaciones con atributo delete false
  try {
    const response = await axiosNoToken().get("/api/publications");
    setPublicaciones(response.data.publications);
  } catch (error) {
    console.error("Error en la carga de las publicaciones", error);
  }
};

export const getLastPublications = async (setLastPublications) => {
  //Trae la última publicación creada de cada categoría
  try {
    const response = await axiosNoToken().get("/api/publications/last");
    setLastPublications(response.data.publications);
  } catch (error) {
    console.error("Error en la carga de las últimas publicaciones", error);
  }
};

export const getAllPublications = async (setPublicaciones) => {
  //Trae todas las publicaciones (incluye eliminadas) - uso exclusivo de ADMIN
  try {
    const response = await axiosToken().get("/api/publications/all");
    setPublicaciones(response.data.publications);
  } catch (error) {
    console.error("Error en la carga de categorías", error);
  }
};

export const getPublicacion = async (id, setPublicacion, setIsLoading) => {
  //Se usa en PublicationDetail
  try {
    const publicationData = await fetchPublication(id);
    setPublicacion(publicationData);
  } catch (error) {
    console.error("Error en la carga de la publicación", error);
  } finally {
    setIsLoading(false);
  }
};

export const getPublicationEdit = async (
  id,
  setPublicacion,
  setIsLoading,
  setLocationImages
) => {
  try {
    const publicationData = await fetchPublication(id);
    const { title, body, header, category, images } =
      publicationData;
    setPublicacion({
      title,
      header,
      body,
      category,
      images,
    });
    setIsLoading(false);
    setLocationImages(images);
  } catch (error) {
    console.error("Error en la carga de la publicación", error);
  }
};

const fetchPublication = async (id) => {
  //Trae una publicacion por su id
  const response = await axiosNoToken().get(`/api/publications/${id}`);
  return response.data;
};

//        SOLICITUDES POST

export const createUser = async (user, setLoading, setError) => {
  try {
    await axiosNoToken().post("/api/users", user);
    window.location.href = "/user/login";
  } catch (error) {
    console.error("Error al registrar usuario", error);
    setError(error.response?.data);
  } finally {
    setLoading(false); // Ocultar preloader al finalizar la solicitud
  }
};

export const postPublication = async (publication, setLoading, setError) => {
  try {
    await axiosToken().post("/api/publications", publication);
    window.location.href = "/";
  } catch (error) {
    console.error("Error al crear la publicación", error);
    setError(error.response?.data);
  } finally {
    setLoading(false); // Ocultar preloader al finalizar la solicitud
  }
};

//        SOLICITUDES DELETE

export const deletePublicationById = async (id, setPublicaciones) => {
  //Elimina una publicación
  try {
    await axiosToken().delete(`/api/publications/${id}`);
    await getAllPublications(setPublicaciones);
  } catch (error) {
    console.error("Error al eliminar la publicación", error);
  }
};

export const deleteImage = async (id, deletedImage) => {
  try {
    await axiosToken().delete(`/api/publications/images/${id}`, {
      data: { imageId: deletedImage },
    });
  } catch (error) {
    console.error("Error al eliminar la imagen", error);
  }
};

//        SOLICITUDES PATCH

export const changeStatus = async (id, setPublicaciones) => {
  //Cambia el estado de deleted de una publicación
  try {
    await axiosToken().patch(`/api/publications/status/${id}`);
    await getAllPublications(setPublicaciones);
  } catch (error) {
    console.error("Error al cambiar el estado de la publicación", error);
  }
};

export const patchPublicacion = async (id, publication, setLoading) => {
  try {
    await axiosToken().patch(`/api/publications/${id}`, publication);
  } catch (error) {
    console.error("Error al editar la publicación", error);
  } finally {
    setLoading(false); // Ocultar preloader al finalizar la solicitud
  }
};

export const formatDate = (dateParam) => {
  return Object.values(dateParam).reverse().slice(3, 6).join("/");
};
