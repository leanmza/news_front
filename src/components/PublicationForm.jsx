import React, { useState, useEffect } from "react";
import "../assets/PublicationForm.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

const PublicationForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [subscriberContent, setSubscriberContent] = useState("");

  const [categories, setCategories] = useState([]);

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

  function sendPublication(e) {
    e.preventDefault();

    const publicationData = new FormData();
    publicationData.append("title", title);
    publicationData.append("body", body);
    publicationData.append("category", category);
    publicationData.append("subscriberContent", subscriberContent);
  
    const requestData = new FormData();
    requestData.append("publication", publicationData); // Asigna el nombre 'publication' a la parte de la solicitud

    console.log(requestData);
    fetch("http://localhost:8080/api/publication/create", {
      
      method: "POST",
      body: requestData,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=boundary',
      },
   
    })
      .then((response) => {
        if (response.status === 200) window.location.href = "/";
        else return Promise.reject("Hubo un error al enviar los datos");
      })

      .catch((message) => {
        alert(message);
      });
  }

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={body}
              onChange={(e) => setBody(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={subscriberContent}
                onChange={(e) => setsubscriberContent(e.target.value)}
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
            onClick={sendPublication}
          >
            Guardar Noticia
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicationForm;
