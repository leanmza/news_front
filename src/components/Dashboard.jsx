import React, { useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import "../assets/Dashboard.css";
import BannerMain from "./banners/BannerMain";

const Dashboard = ({ lastPublications, publicaciones }) => {
  const { category } = useParams();
  const { query } = useParams();
  const [emptyResult, setEmptyResult] = useState(false);

  const className = {
    gridPublications: "col-12 col-sm-6 col-md-4 colCard",
    lastPublications: "col-12 col-sm-6 ultimas",
  };

  if (category !== null && category !== undefined) {
    // Filtrar las publicaciones por categoría si se proporciona una categoría válida
    publicaciones = publicaciones.filter((item) => item.category === category);
  }

  if (query !== null && query !== undefined) {
    const queryLowerCase = query.toLowerCase();

    publicaciones = publicaciones.filter((item) =>
      item.title.toLowerCase().includes(queryLowerCase)
    );

    if (publicaciones.length === 0) {
      setEmptyResult(true);
    }
  }

  return (
    <div className="container-fluid divMain">
      {emptyResult ? (
        <h5 className="noResult">
          No se encontraron publicaciones con "{query}" en su título
        </h5>
      ) : null}

      {lastPublications ? (
        <div className="lastPublications row col-10">
          {lastPublications.map((item) => (
            <Card
              key={item.id}
              item={item}
              className={className.lastPublications}
            ></Card>
          ))}
        </div>
      ) : null}
      {/* <HorizontalCard lastPublications={lastPublications} /> */}

      <BannerMain></BannerMain>
      <div className="cardsMain row">
        {publicaciones.map((item) => (
          <Card
            key={item.id}
            item={item}
            className={className.gridPublications}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
