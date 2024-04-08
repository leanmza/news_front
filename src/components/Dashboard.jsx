import React, { useState, useEffect } from "react";
import standardImg from "../assets/img/standard-image.jpg";
import Card from "./Card";

const Dashboard = ({ publicaciones }) => {

  return (
    <div className="container-fluid divMain">
      <div className="row row-cols-1">
        {publicaciones.map((item) => (
            <Card
              key={item.id}
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
