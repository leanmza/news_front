import { axiosNoToken, axiosToken } from "./axiosConfig";

//En este servicio se encuentran todos las peticiones GET, DELETE, PATCH Y POST de publication

//        SOLICITUDES GET

export const getPublications = async (setPublicaciones) => {
  //Trae todas las publicaciones con atributo delete false
  try {
    const response = await axiosNoToken().get("/api/publication");
    setPublicaciones(response.data.publications);
  } catch (error) {
    console.error("Error en la carga de categorías", error);
  }
};

export const getLastPublications = async (setLastPublications) => {
  //Trae la última publicación creada de cada categoría
  try {
    const response = await axiosNoToken().get("/api/publication/last");
    setLastPublications(response.data.publications);
  } catch (error) {
    console.error("Error en la carga de categorías", error);
  }
};

export const getAllPublications = async (setPublicaciones) => {
  //Trae todas las publicaciones
  try {
    const response = await axiosNoToken().get("/api/publication/all");
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
    setIsLoading(false);
  } catch (error) {
    console.error("Error en la carga de la publicación", error);
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
    const { title, body, header, category, subscriberContent, images } =
      publicationData;
    setPublicacion({
      title,
      header,
      body,
      category,
      subscriberContent,
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
  const response = await axiosNoToken().get(`/api/publication/${id}`);
  return response.data;
};

//        SOLICITUDES POST

export const createUser = async (user, setLoading, setError) => {
  try {
    const response = await axiosNoToken().post("/api/users/create", user);
    console.log(response.status, "usuario registrado");
    window.location.href = "/user/login";
  } catch (error) {
    console.log(error.response.data);
    setError(error.response.data);
  } finally {
    setLoading(false); // Ocultar preloader al finalizar la solicitud
  }
};

export const postPublication = async (publication, setLoading, setError) => {
  try {
    const response = await axiosToken().post(
      "/api/publication/create",
      publication
    );
    console.log(response.status, " publicación creada");
    window.location.href = "/";
  } catch (error) {
    console.log(error.response.data);
    setError(error.response.data);
  } finally {
    setLoading(false); // Ocultar preloader al finalizar la solicitud
  }
};

//        SOLICITUDES DELETE

export const deletePublicationById = async (id, setPublicaciones) => {
  //Elimina una publicación
  try {
    const response = await axiosNoToken().delete(`/api/publication/${id}`);
    await getAllPublications(setPublicaciones);
    console.log(response);
  } catch (error) {
    console.error("Error en la carga de categorias", error);
  }
};

export const deleteImage = async (id, deletedImage) => {
  try {
    const response = await axiosNoToken().delete(
      `/api/publication/images/${id}`,
      { data: { imageId: deletedImage } }
    );
    console.log(response);
  } catch (error) {
    console.error("Error en la carga de categorias", error);
  }
};

//        SOLICITUDES PATCH

export const changeStatus = async (id, setPublicaciones) => {
  //Cambia el estado de deleted de una publicación
  try {
    const response = await axiosNoToken().patch(
      `/api/publication/status/${id}`
    );
    await getAllPublications(setPublicaciones);
    console.log(response);
  } catch (error) {
    console.error("Error en la carga de categorias", error);
  }
};

export const patchPublicacion = async (id, publication, setLoading) => {
  try {
    const response = await axiosToken().patch(
      `/api/publication/${id}`,
      publication
    );
    console.log(response.data, " publicación editada");
  } catch (error) {
    console.error("Hubo un error", error);
  } finally {
    setLoading(false); // Ocultar preloader al finalizar la solicitud
  }
};

export const formatDate = (dateParam) => {
  return Object.values(dateParam).reverse().slice(3, 6).join("/");
};
