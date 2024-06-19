import { Modal, Button } from "react-bootstrap";

const ModalExclusive = ({ show, handleVolver, handleSubscribe }) => {
  const actionList = {
    exclusive: {
      title: `EXCLUSIVO PARA SUSCRIPTORES`,
      message: `Suscribite a nuestro sitio y disfrutá de este contenido y mucho más`,
      warning: null,
      buttonTxt: `Iniciar Sesión`,
      buttonVariant: "primary",
    },
  };

  const { title, message, warning, buttonTxt, buttonVariant } =
    actionList["exclusive"];

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          <p className="warning">{warning}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleVolver}>
            Volver
          </Button>
          <Button variant={buttonVariant} onClick={handleSubscribe}>
            {buttonTxt}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalExclusive;
