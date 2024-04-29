export const sortBy = (listaObjetos, sortValue, ordenInverso) => {
  const listaOrdenada = [...listaObjetos];

  const objets = ["category", "author"];

  // Determina el orden de clasificación según el estado actual
  const orden = ordenInverso ? -1 : 1;

  listaOrdenada.sort((a, b) => {
    // Manejo especial si el valor a comparar es un booleano
    if (
      typeof a[sortValue] === "boolean" &&
      typeof b[sortValue] === "boolean"
    ) {
      return (
        (a[sortValue] === b[sortValue] ? 0 : a[sortValue] ? 1 : -1) * orden
      );
    }

    // Manejo especial si el valor a comparar es un entero
    if (Number.isInteger(a[sortValue]) && Number.isInteger(b[sortValue])) {
      return (a[sortValue] - b[sortValue]) * orden;
    }

    // Manejo especial si el valor a comparar es un atributo de un objeto
    if (objets.includes(sortValue)) {
      return a[sortValue].name.localeCompare(b[sortValue].name) * orden;
    }
    // Compara los títulos y devuelve el resultado multiplicado por el orden
    return a[sortValue].localeCompare(b[sortValue]) * orden;
  });

  // Devuelve las publicaciones ordenadas
  return listaOrdenada;
};
