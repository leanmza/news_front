import React, { useEffect, useState } from "react";
import "../assets/PublicationForm.css";
import axios from "axios";

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

  useEffect(() => {
    fetchCategories();
  }, []);

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



  function eliminarComillas(cadena) {
    return cadena.replace(/"/g, "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = eliminarComillas(localStorage.getItem("jwt"));

    console.log(formImg);
    const publication = new FormData();
    formImg.images.forEach(image => {
      publication.append('images', image);
    });
    publication.append('publication', new Blob([JSON.stringify(publi)], {type: 'application/json'}));
 
  
    console.log(publication);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/publication/create",
        publication,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json' ,
          },
        }
      );
      console.log(response);
      window.location.href = "/";
     
    } catch (error) {
      console.error("Hubo un error", error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Titulo</label>
        <input type="text" name="title" id="title" onChange={handleInputForm} />
      </div>
      <div>
        <label htmlFor="body">Cuerpo del articulo</label>
        <textarea
          name="body"
          id="body"
          cols="60"
          rows="10"
          onChange={handleInputForm}
        ></textarea>
      </div>
      <div>
        <label htmlFor="category">Categoria</label>
        <select name="category" id="category" onChange={handleInputForm}>
          <option value="">Elegir una categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subscriberContent">¿Exclusivo para suscriptores?</label>
        <input
          type="checkbox"
          name="subscriberContent"
          id="subscriberContent"
          onChange={handleInputForm}
        />
      </div>
      <div>
        <label htmlFor="image">Cargar imagenes</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          multiple
          onChange={handleImageForm}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Guardar Publicación
        </button>
      </div>
    </div>
  );
};

export default PublicationForm;
