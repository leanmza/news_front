import React from "react";
import "../../assets/Commentary.css";

const Commentary = ( {item} ) => {
  console.log("desde commentary");
  console.log(item);

  const { user, commentary } = item;

  console.log(user, " ", commentary);
  return (
    <div className="commentBox">
      <div className="user">
        <span>{user}</span>
      </div>
      <div className="text">
        <p>{commentary}</p>
      </div>
    </div>
  );
};

export default Commentary;
