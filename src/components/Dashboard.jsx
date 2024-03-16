import React from "react";
import standardImg from "../assets/img/standard-image.jpg";
import Card from "./Card";

const Dashboard = ({ publicaciones }) => {
  return (
    <div className="container-fluid divMain">
      <div class="row row-cols-1">
          {publicaciones.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              body={item.body}
              creationDate={item.creationDate}
              author={item.author}
              category={item.category}
              subscriberContent={item.subscriberContent}
              visualization={item.visualization}
              image={standardImg}
            ></Card>
          ))}
  
      </div>
    </div>
  );
};

export default Dashboard;
