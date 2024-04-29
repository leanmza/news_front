import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalAction = ({
  showModal,
  handleClose,
  item,
  action,
  deletePublication,
  changeDeletedStatus,
  fetchPublications,
}) => {
    //Armo un Array con las posibles acciones y mensajes

    console.log("ModalAction", action);
  const actionList = {
    delete: {
      headTxt: `Eliminar Publicación`,
      message: `¿Desea eliminar la publicación ${item.title}?`,
      warning: `Esta acción NO SE PUEDE DESHACER`,
      buttonTxt: `ELIMINAR`,
      buttonVariant: "danger",
      actionFunction: async () => {
        await deletePublication(itemId);
        await fetchPublications();
        handleClose(itemId);
      },
    },
    changeStatus: {
      headTxt: `Cambiar estado de publicacion`,
      message: `¿Desea cambiar el estado de la publicación ${item.title}?`,
      warning: null,
      buttonTxt: `Guardar Cambio`,
      buttonVariant: "primary",
      actionFunction: async () => {
        await changeDeletedStatus(itemId);
        await fetchPublications();
        handleClose(itemId);
      },
    },
  };

  const {
    headTxt,
    message,
    warning,
    buttonTxt,
    buttonVariant,
    actionFunction,
  } = actionList[action];

  return (
    <>
      <Modal show={showModal} onHide={() => handleClose(item.id)}>
        <Modal.Header closeButton>
          <Modal.Title>{headTxt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
          {warning && <p className="warning">{warning}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(item.id)}>
            Cancelar
          </Button>
          <Button variant={buttonVariant} onClick={actionFunction}>
            {buttonTxt}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAction;
