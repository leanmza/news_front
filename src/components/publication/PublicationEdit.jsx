import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../../assets/PublicationForm.css";
import { getCategories } from "../../util/getCategories";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  deleteImage,
  getPublicationEdit,
  patchPublicacion,
} from "../../util/publicationService";

import TextArea from "../common/TextArea";
import InputSelect from "./../common/InputSelect";
import InputImage from "../common/InputImage";

const PublicationEdit = () => {
  const { id } = useParams();

  const [publicacion, setPublicacion] = useState({
    title: "",
    header: "",
    body: "",
    category: "",
    subscriberContent: "",
  });

  const [formImg, setFormImg] = useState({
    images: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [locationImages, setLocationImages] = useState();

  const [rearrange, setRearrange] = useState(false);

  useEffect(() => {
    getPublicationEdit(id, setPublicacion, setIsLoading, setLocationImages);
    getCategories(setCategories);
  }, []);

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
      images: imageFiles,
    });
  };

  const handleDeleteImage = async (index) => {
    const updatedImages = [...publicacion.images];
    const deletedImage = publicacion.images[index].id;
    updatedImages.splice(index, 1);
    setPublicacion({
      ...publicacion,
      images: updatedImages,
    });

    deleteImage(id, deletedImage);
  };

  const handleImagePositionChange = async (dragIndex, dropIndex) => {
    const updatedImages = [...publicacion.images];
    const draggedImage = updatedImages[dragIndex];
    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(dropIndex, 0, draggedImage);

    await setPublicacion({
      ...publicacion,
      images: updatedImages,
    });

    await setRearrange(true);
    await setLocationImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Armo un nuevo array con solo los datos de publicacion, sin la data de las imagenes
    const publicacionData = { ...publicacion };
    delete publicacionData.images;

    
    const idImages = locationImages.map((image) => image.id);

    const publication = new FormData();
    formImg.images.forEach((image) => {
      publication.append("images", image);
    });
    publication.append(
      "publication",
      new Blob([JSON.stringify(publicacionData)], { type: "application/json" })
    );
    if(rearrange === true){
    publication.append(
      "idImages",
      new Blob([JSON.stringify(idImages)], { type: "application/json" })
    );
    }

    console.log(publication);
    console.log(idImages)
    await patchPublicacion(id, publication, setIsLoading);

    // window.location.href = `/publication/${id}`;
  };

  if (isLoading) {
    return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga mientras se está cargando la publicación
  }

  return (
    <div>
      <div className="container-fluid form">
        <h1 className="titulo col-12">Editar Publicación</h1>
        <div className="col-md-10 col-lg-8">
          <form>
            <Input
              label={"Título"}
              type={"text"}
              name={"title"}
              onChange={handleInputForm}
              value={publicacion.title}
            />
            <TextArea
              label={"Encabezado"}
              name={"header"}
              onChange={handleInputForm}
              maxLength={140}
              value={publicacion.header}
            />
            <TextArea
              label={"Cuerpo del artículo"}
              name={"body"}
              onChange={handleInputForm}
              value={publicacion.body}
            />
            <div className="row dataComplementary">
              <div className="col-md-3">
                <InputSelect
                  label={"Categoría"}
                  name={"category"}
                  onChange={handleInputForm}
                  categories={categories}
                  value={publicacion.category}
                />
              </div>
              <div className="col-md-4 divSubscribers">
                <Form.Check
                  className="checkFrom"
                  name="subscriberContent"
                  label="¿Exclusivo para suscriptores?"
                  checked={publicacion.subscriberContent}
                  onChange={handleInputForm}
                />
              </div>
            </div>
            <div className="row rowImagenes">
              {publicacion.images.map((image, index) => (
                <div
                  className="col-lg-4"
                  key={index}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", index)
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const dragIndex = Number(
                      e.dataTransfer.getData("text/plain")
                    );
                    handleImagePositionChange(dragIndex, index);
                  }}
                >
                  <img src={image.imageUrl} alt="" className="imgEditForm" />
                  <span
                    className="material-symbols-outlined link"
                    onClick={() => handleDeleteImage(index)}
                  >
                    delete
                  </span>
                </div>
              ))}
            </div>
            <div className="col-md-5 cargaImg">
              <InputImage
                label={"Cargar imágenes"}
                name={"image"}
                onChange={handleImageForm}
              />
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
