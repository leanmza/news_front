import React from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import HorizontalCard from "./HorizontalCard";
import BannerMain from "./banners/BannerMain";

const Dashboard = ({ ultimas, publicaciones }) => {
  const { category } = useParams();
  const { query } = useParams();
  let emptyResult = false;

  if (category !== null && category !== undefined) {
    // Filtrar las publicaciones por categoría si se proporciona una categoría válida
    publicaciones = publicaciones.filter(
      (item) => item.category.name === category
    );
  }

  if (query !== null && query !== undefined) {
    const queryLowerCase = query.toLowerCase();

    publicaciones = publicaciones.filter((item) =>
      item.title.toLowerCase().includes(queryLowerCase)
    );

    if (publicaciones.length === 0) {
      emptyResult = true;
    }
  }

  return (
    <div className="container-fluid divMain">
      
      {emptyResult ? (
        <h5 className="noResult">
          No se encontraron publicaciones con "{query}" en su título
        </h5>
      ) : null}
      <section className="horizontalCard row row-cols-1">
        <HorizontalCard ultimas={ultimas} />
      </section>
      <BannerMain></BannerMain>
      <section className="cardsMain row">
        {publicaciones.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            body={item.body}
            creationDate={item.creationDate}
            author={item.author.name}
            category={item.category.name}
            subscriberContent={item.subscriberContent}
            views={item.views}
            image={item.images[0]}
          ></Card>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
