import React, { useEffect, useState } from "react";
import "../assets/PublicationForm.css";
import axios from "axios";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { getCategories } from "../util/getCategories";
import { getToken } from "../util/securityService";

const PublicationForm = () => {
  const [categories, setCategories] = useState([]);
  const [publi, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    subscriberContent: "",
  });

  const [formImg, setFormImg] = useState({
    images: [],
  });

  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del preloader

  //Traigo el token
  const token = getToken();

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories(setCategories);
    };
    fetchCategories();
  }, []);

  function handleInputForm(event) {
    const { name, value, type, checked } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...publi,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const publication = new FormData();
    formImg.images.forEach((image) => {
      publication.append("images", image);
    });
    publication.append(
      "publication",
      new Blob([JSON.stringify(publi)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/api/publication/create",
        publication,
        headers
      );
      console.log(response.status, " publicación creada");
      window.location.href = "/";
    } catch (error) {
      console.error("Hubo un error", error);
    } finally {
      setLoading(false); // Ocultar preloader al finalizar la solicitud
    }
  };

  return (
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
                onChange={handleInputForm}
              />
            </div>
            <div className="col-md-5">
              <FloatingLabel controlId="floatingFile" label="Imágenes">
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  multiple
                  onChange={handleImageForm}
                />
              </FloatingLabel>
            </div>
          </div>
          <div className="divButton">
            <button
              type="submit"
              className="btn btn-primary btn-lg btnSubmit"
              onClick={handleSubmit}
            >
              Guardar Publicación
            </button>
          </div>
          {loading && (
            <div className="text-center mt-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Guardando publicación</span>
              </Spinner>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
