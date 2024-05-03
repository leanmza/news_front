import { Modal, Button } from "react-bootstrap";

const ModalAdmin = ({
  show,
  item,
  action,
  handleClose,
  deletePublication,
  fetchPublications,
  changeDeletedStatus,
}) => {
  
  let data = {
    title: "",
    message: "",
    warning: "",
    buttonTxt: "",
    buttonVariant: "",
    actionFunction: "",
  };

  if (item !== undefined) {
    const actionList = {
      delete: {
        title: `Eliminar Publicación`,
        message: `¿Desea eliminar la publicación ${item.title}`,
        warning: `Esta acción NO SE PUEDE DESHACER`,
        buttonTxt: `ELIMINAR`,
        buttonVariant: "danger",
        actionFunction: async () => {
          await deletePublication(item.id);
          await fetchPublications();
          handleClose(item.id);
        },
      },
      changeStatus: {
        title: `Cambiar estado de publicacion`,
        message: `¿Desea cambiar el estado de la publicación ${item.title}?`,
        warning: null,
        buttonTxt: `Guardar Cambio`,
        buttonVariant: "primary",
        actionFunction: async () => {
          await changeDeletedStatus(item.id);
          await fetchPublications();
          handleClose(item.id);
        },
      },
    };

    data = actionList[action];
  }

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {data.message}
          <p className="warning">{data.warning}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant={data.buttonVariant} onClick={data.actionFunction}>
            {data.buttonTxt}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdmin;
