import React from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";

const Dashboard = ({ publicaciones }) => {

  const { category } = useParams();

  if (category !== null && category !== undefined) {
    // Filtrar las publicaciones por categoría si se proporciona una categoría válida
    publicaciones = publicaciones.filter(
      (item) => item.category.name === category
    );

  }

  return (
    <div className="container-fluid divMain">
      <div className="row row-cols-1">
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
              visualization={item.visualization}
              image={item.images[0]}
  
            ></Card>
          ))}
  
      </div>
    </div>
  );
};

export default Dashboard;
