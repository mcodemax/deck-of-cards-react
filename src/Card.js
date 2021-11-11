import './Card.css';
import React from "react";

const Card = ({code}) => {
    

    return (
        <div className="Card">
          <img src=`./images/${code}.svg` alt="Card info here">
        </div>
    );
};

export default Box;
