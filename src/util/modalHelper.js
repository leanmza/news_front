export const modalData = (item, action) => {
  const actionList = {
    delete: {
      title: `Eliminar Publicación`,
      message: `¿Desea eliminar la publicación ${item.title}?`,
      warning: `Esta acción NO SE PUEDE DESHACER`,
      buttonTxt: `ELIMINAR`,
      buttonVariant: "danger",

      actionFunction: async () => {
        await deletePublication(itemId),
          await fetchPublications(),
          handleClose(itemId);
      },
    },

    changeStatus: {
      title: `Cambiar Visibilidad de la Publicación`,
      message: `¿Desea cambiar el estado de la publicación ${item.title}?`,
      warning: null,
      buttonTxt: `Guardar Cambio`,
      buttonVariant: "primary",

      actionFunction: async () => {
        await changeDeletedStatus(itemId),
          await fetchPublications(),
          handleClose(itemId);
      },
    },
  };
};
