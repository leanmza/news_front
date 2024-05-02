// import { Modal, Button } from "react-bootstrap";

// const ModalAdmin = ({
//   showModal,
//   item,
//   action,
//   handleClose,
//   deletePublication,
//   fetchPublications,
// }) => {
//   console.log("hola", action);
//   const actionList = {
//     delete: {
//       title: `Eliminar Publicación`,
//       message: `¿Desea eliminar la publicación ${item.title}`,
//       warning: `Esta acción NO SE PUEDE DESHACER`,
//       buttonTxt: `ELIMINAR`,
//       buttonVariant: "danger",
//       actionFunction: async () => {
//         await deletePublication(item.id);
//         await fetchPublications();
//         handleClose(item.id);
//       },
//     },
//     changeStatus: {
//       title: `Cambiar estado de publicacion`,
//       message: `¿Desea cambiar el estado de la publicación ${item.title}?`,
//       warning: null,
//       buttonTxt: `Guardar Cambio`,
//       buttonVariant: "primary",
//       actionFunction: async () => {
//         await changeDeletedStatus(item.id);
//         await fetchPublications();
//         handleClose(item.id);
//       },
//     },
//   };

//   const { title, message, warning, buttonTxt, buttonVariant, actionFunction } =
//     actionList[action];
//   return (
//     <>
//       <Modal show={showModal[item]}>
//         <Modal.Header>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {message}
//           <p className="warning">{warning}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => handleClose(item.id)}>
//             Cancelar
//           </Button>
//           <Button variant={buttonVariant} onClick={actionFunction}>
//             {buttonTxt}
//           </Button>
//         </Modal.Footer>
//       </Modal>



//     </>
//   );
// };

// export default ModalAdmin;
