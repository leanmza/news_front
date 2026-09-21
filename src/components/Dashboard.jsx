import { useMemo } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import { useParams } from "react-router-dom";
import "../styles/Dashboard.css";
import BannerMain from "./banners/BannerMain";
import Carrousel  from "./Carrousel";

const className = {
  gridPublications: "col-12 col-sm-6 col-md-4 colCard",
};

const Dashboard = ({ lastPublications, publicaciones }) => {
  const { category } = useParams();
  const { query } = useParams();

  // Se recalcula solo cuando cambian las publicaciones, la categoría o la búsqueda,
  // en vez de en cada render del componente.
  const publicacionesFiltradas = useMemo(() => {
    let filtradas = publicaciones;

    if (category !== null && category !== undefined) {
      filtradas = filtradas.filter((item) => item.category === category);
    }

    if (query !== null && query !== undefined) {
      const queryLowerCase = query.toLowerCase();
      filtradas = filtradas.filter((item) =>
        item.title.toLowerCase().includes(queryLowerCase)
      );
    }

    return filtradas;
  }, [publicaciones, category, query]);

  // Se calcula en cada render a partir del resultado actual, en vez de guardarse
  // en un estado que nunca se reseteaba a false una vez que había quedado en true.
  const emptyResult = query !== null && query !== undefined && publicacionesFiltradas.length === 0;

  return (
    <div className="container-fluid divMain">
      {emptyResult ? (
        <h5 className="noResult">
          No se encontraron publicaciones con &quot;{query}&quot; en su título
        </h5>
      ) : null}

      <Carrousel lastPublications={lastPublications} />

      <BannerMain></BannerMain>
      <section className="categorysCards">
        <div className="cardsMain row">
          {publicacionesFiltradas.map((item) => (
            <Card
              key={item.id}
              item={item}
              className={className.gridPublications}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  lastPublications: PropTypes.arrayOf(PropTypes.object),
  publicaciones: PropTypes.arrayOf(PropTypes.object),
};

Dashboard.defaultProps = {
  lastPublications: [],
  publicaciones: [],
};
