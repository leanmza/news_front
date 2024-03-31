import React, { useState, useEffect } from "react";
import "../assets/PublicationForm.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useLocalState } from "../util/useLocalStorage";

const PublicationForm = () => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    subscriberContent: "",
    // images:[],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  function eliminarComillas(cadena) {
    return cadena.replace(/"/g, "");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jwtToken = eliminarComillas(localStorage.getItem("jwt"));

    const config = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    const formDataToSend = new FormData();
    // formData.images.forEach(image => {
    //   formDataToSend.append('images', image);
    // });
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        formDataToSend.append(key, formData[key]);
      }
    });

    console.log(config);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/publication/create",
        formData,
        config,
        {}
      );

      console.log("response.data" + response.data);
    } catch (error) {
      console.error("Hubo un error al enviar los datos del formulario:", error);
    }

    console.log(formData);

    setFormData({
      title: "",
      body: "",
      category: "",
      subscriberContent: "",
      // images:[],
    });
  };

  return (
    <div className="rowForm">
      <h1>NUEVA PUBLICACIÓN</h1>
      <form className="form">
        <div className="form-outline mb-3 col-12">
          <FloatingLabel
            controlId="floatingInput"
            label="Título"
            className="mb-3"
          >
            <input
              type="text"
              id="title"
              className="form-control form-control-lg"
              placeholder="Título"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </div>

        <div className="form-outline mb-3 col-12">
          <FloatingLabel
            controlId="floatingInput"
            label="Texto de la publicación"
            className="mb-3"
          >
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="15"
              className="form-control form-control-lg inputBody"
              placeholder="Cuerpo de la noticia"
              value={formData.body}
              onChange={handleInputChange}
            ></textarea>
          </FloatingLabel>
        </div>

        <div className="row rowDataForm">
          <div className="form-outline mb-2 col-3">
            <FloatingLabel controlId="floatingSelect" label="Categoría">
              <select
                id="category"
                className="form-control form-control-lg"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Elegir una categoría</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </FloatingLabel>
          </div>

          <div className="form-outline mb-2 col-3  divCheckbox">
            <label className="form-check-label">
              ¿Exclusivo suscritores?
              <input
                type="checkbox"
                id="subscriberContent"
                className="form-check-input"
                name="subscriberContent"
                autoComplete="off"
                value={formData.subscriberContent}
                onChange={handleInputChange}
              />
            </label>
          </div>

          {/* <div className="form-outline mb-2 col-5">
            <label className="form-label">
              Subir imagen
              <input
                type="file"
                id="image"
                className="form-control form-control-lg"
                placeholder="Subir imagen"
                name="imageFile"
              />
            </label>
          </div> */}
        </div>

        <div className="text-center text-lg-start mt-2 pt-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg btnSubmit"
            id="btnSubmit"
            onClick={handleSubmit}
          >
            Guardar Noticia
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicationForm;
