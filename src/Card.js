import './Card.css';
import React from "react";

const Card = ({image}) => {
    return (
        <div className="Card">
          <img src={image} alt="Card info here"/>
        </div>
    );
};

export default Card;
