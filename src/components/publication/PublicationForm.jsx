import React, { useEffect, useState } from "react";
import "../../assets/PublicationForm.css";
import { Form, Spinner } from "react-bootstrap";
import { getCategories } from "../../util/getCategories";
import Input from "../common/Input";
import Button from "../common/Button";
import { postPublication } from "../../util/publicationService";
import TextArea from "../common/TextArea";
import InputSelect from "./../common/InputSelect";
import InputImage from "../common/InputImage";

const PublicationForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    header: "",
    body: "",
    subscriberContent: "",
  });

  const [formImg, setFormImg] = useState({
    images: [],
  });

  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del preloader
  const [error, setError] = useState({
    title: "",
    header: "",
    body: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await getCategories(setCategories);
  };

  function handleInputForm(event) {
    const { name, value, type, checked } = event.target;

    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
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
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    postPublication(publication, setLoading, setError);
  };

  console.log(error);

  return (
    <div className="container-fluid form">
      <h1 className="titulo col-12">Nueva Publicación</h1>
      <div className="col-md-10 col-lg-8">
        <form>
          <Input
            label={"Título de la publicación"}
            type={"text"}
            name={"title"}
            onChange={handleInputForm}
            error={error.title}
          />

          <TextArea
            label={"Encabezado"}
            name={"header"}
            onChange={handleInputForm}
            maxLength={140}
            error={error.header}
          />

          <TextArea
            label={"Cuerpo del artículo"}
            name={"body"}
            onChange={handleInputForm}
            error={error.body}
          />

          <div className="row dataComplementary">
            <div className="col-md-3">
              <InputSelect
                label={"Categoría"}
                name={"category"}
                onChange={handleInputForm}
                categories={categories}
                error={error.category}
              />
            </div>
            <div className="col-md-4 divSubscribers">
              <Form.Check
                className="checkFrom"
                name="subscriberContent"
                label="¿Exclusivo para suscriptores?"
                onChange={handleInputForm}
              />
            </div>
            <div className="col-md-5">
              <InputImage
                label={"Cargar imágenes"}
                name={"image"}
                onChange={handleImageForm}
              />
            </div>
          </div>
          <div className="divButton">
            <Button
              type={"submit"}
              variant={"primary"}
              onClick={handleSubmit}
              text={"Guardar Publicación"}
            />
          </div>
          {loading && (
            <div className="text-center mt-3">
              <Spinner animation="border" role="status">
                <span className="visually-hidden spinner">
                  Guardando publicación
                </span>
              </Spinner>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
