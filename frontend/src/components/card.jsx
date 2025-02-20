import React from "react";
import { FaStar } from "react-icons/fa";
import "../styles/card.css";

const Card = ({ title, description, price, location, imageUrl }) => {
  return (
    <div className="card border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="card-image w-full h-48 object-cover"
        />
      )}
      <div className="card-content p-4">
        <div className="flex items-center mb-2">
          <div className="availability-indicator bg-green-500 rounded-full h-2 w-2 mr-2"></div>
          <span className="text-sm text-green-500">Available</span>
        </div>
        <h3 className="card-title font-bold text-xl mb-2">{title}</h3>
        <p className="card-description text-gray-700 mb-4">{description}</p>
        <p className="card-location text-gray-700 mb-2">{location}</p>
        <div className="card-rating flex items-center mb-4">
          <FaStar className="h-5 w-5 text-yellow-500" />
          <span className="ml-2 text-gray-700">5.5</span>
        </div>
        <p className="card-price font-bold text-xl">
          ${price} <span className="text-gray-500 text-sm">/ night</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
