import React from "react";
import { FaStar } from "react-icons/fa";
import "../styles/card.css";

const Card = ({ title, description, price, location, imageUrl }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <div className="card-content-left">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <p className="card-location">{location}</p>
          <p className="card-price">${price}/ night</p>
        </div>
        <div className="card-content-right">
          <FaStar className="star-icon" />
          <span className="rating">5.5</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
