import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FloatingLabel, Form } from "react-bootstrap";
import "../../assets/PublicationForm.css";
import { getCategories } from "../../util/getCategories";
import { axiosNoToken, axiosToken } from "../../util/axiosConfig";
import Input from "../common/Input";
import Button from "../common/Button";

const PublicationEdit = () => {
  const { id } = useParams();

  const [publicacion, setPublicacion] = useState({
    title: "",
    body: "",
    category: "",
    subscriberContent: "",
  });

  const [formImg, setFormImg] = useState({
    images: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPublicacion(id);
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await getCategories(setCategories);
  };

  const fetchPublicacion = async (id) => {
    try {
      const response = await axiosNoToken().get(`/api/publication/${id}`);
      const { title, body, category, subscriberContent, images } =
        response.data;
      const categoryName = category ? category.name : ""; // Si category es null o undefined, asigna una cadena vacía
      setPublicacion({
        title,
        body,
        category: categoryName,
        subscriberContent,
        images,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error en la carga de la publicación", error);
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

  //Maneja nuevas imágenes
  const handleImageForm = (event) => {
    const files = event.target.files;
    let imageFiles = [];
    for (let i = 0; i < files.length; i++) {
      imageFiles.push(files[i]);
    }

    setFormImg({
      images: imageFiles,
    });
  };

  const handleDeleteImage = (index) => {
    console.log("DELETE images ", publicacion.images);
    const updatedImages = [...publicacion.images];
    updatedImages.splice(index, 1);
    setPublicacion({
      ...publicacion,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formImg);
    console.log(publicacion);
    const publication = new FormData();
    formImg.images.forEach((image) => {
      publication.append("images", image);
    });
    publication.append(
      "publication",
      new Blob([JSON.stringify(publicacion)], { type: "application/json" })
    );

    try {
      const response = await axiosToken().patch(
        `/api/publication/${id}`,
        publication
      );
      console.log(response.data, " publicación editada");
      window.location.href = `/publication/${id}`;
    } catch (error) {
      console.error("Hubo un error", error);
    }
  };

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
              <Input
                label={"Título"}
                type={"text"}
                name={"title"}
                onChange={handleInputForm}
                value={publicacion.title}
              />
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
                  <span
                    class="material-symbols-outlined link"
                    onClick={() => handleDeleteImage(index)}
                  >
                    delete
                  </span>
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
              <Button
                type={"submit"}
                variant={"primary"}
                onClick={handleSubmit}
                text={"Guardar Cambios"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicationEdit;
