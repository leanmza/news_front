import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FloatingLabel, Form } from "react-bootstrap";
import "../assets/PublicationForm.css";

const PublicationEdit = () => {
  const { id } = useParams();

  const [publicacion, setPublicacion] = useState({
    title: "",
    body: "",
    category: "",
    subscriberContent: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPublicacion(id);
    fetchCategories();
  }, [id]);

  const fetchPublicacion = async (id) => {
    try {
      console.log("try");
      const response = await axios.get(
        `http://localhost:8080/api/publication/${id}`
      );

      console.log(response.data);
      setPublicacion(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la carga de la publicación", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data.categories); // Asumiendo que response.data es un array de categorías
    } catch (error) {
      console.error("Error en la carga de categorias", error);
    }
  };

  function handleInputForm(event) {
    const { name, value, type, checked } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setPublicacion({
      ...publicacion,
      [name]: inputValue,
    });
  }

  const handleImageForm = (event) => {
    const files = event.target.files;
    let imageFiles = [];
    for (let i = 0; i < files.length; i++) {
      imageFiles.push(files[i]);
    }
    setFormImg({
      ...formImg,
      images: imageFiles,
    });
  };

  function eliminarComillas(cadena) {
    return cadena.replace(/"/g, "");
  }

  console.log("publicacion");
  console.log(publicacion);

  const handleDeleteImage = (index) => {
    const updatedImages = [...publicacion.images];
    updatedImages.splice(index, 1);
    setPublicacion({
      ...publicacion,
      images: updatedImages,
    });
  };

  console.log("publicacion");
  console.log(publicacion);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = eliminarComillas(localStorage.getItem("jwt"));

    // console.log(formImg);
    const publication = new FormData();
    // formImg.images.forEach((image) => {
    //   publication.append("images", image);
    // });
    publication.append(
      "publication",
      new Blob([JSON.stringify(publicacion)], { type: "application/json" })
    );

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/publication/${id}`,
        publication,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      window.location.href = `/publication/${id}`;
    } catch (error) {
      console.error("Hubo un error", error);
    }
  };

  console.log("publicacion");
  console.log(publicacion);

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga mientras se está cargando la publicación
  }

  return (
    <div>
      <div className="container-fluid form">
        <h1 className="titulo col-12">Nueva Publicación</h1>
        <div className="col-md-10 col-lg-8">
          <form>
            <div>
              <FloatingLabel
                controlId="floatingInput"
                label="Título"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Título"
                  name="title"
                  onChange={handleInputForm}
                  value={publicacion.title}
                />
              </FloatingLabel>
            </div>
            <div>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Cuerpo del articulo"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Cuerpo del artículo"
                  style={{ height: "300px" }}
                  onChange={handleInputForm}
                  name="body"
                  value={publicacion.body}
                />
              </FloatingLabel>
            </div>
            <div className="row dataComplementary">
              <div className="col-md-3">
                <FloatingLabel controlId="floatingSelect" label="Categoría">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="category"
                    onChange={handleInputForm}
                    value={publicacion.category.name}
                  >
                    <option>Elegir una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </div>
              <div className="col-md-4 divSubscribers">
                <Form.Check
                  name="subscriberContent"
                  label="¿Exclusivo para suscriptores?"
                  checked={publicacion.subscriberContent}
                  onChange={handleInputForm}
                />
              </div>
            </div>
            <div className="row rowImagenes">
              {publicacion.images.map((image, index) => (
                <div className="col-lg-4" key={index}>
                  <img src={image} alt="" className="imgEditForm" />
                  <i
                    className="fa-solid fa-trash-can link"
                    onClick={() => handleDeleteImage(index)}
                  ></i>
                </div>
              ))}
            </div>
            <div className="col-md-5 cargaImg">
              <FloatingLabel controlId="floatingFile" label="Cargar imágenes">
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleImageForm}
                />
              </FloatingLabel>
            </div>

            <div className="divButton">
              <button
                type="submit"
                className="btn btn-primary btn-lg btnSubmit"
                onClick={handleSubmit}
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicationEdit;
