import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaBed,
  FaWifi,
  FaDumbbell,
  FaTv,
  FaCoffee,
  FaTree,
  FaCar,
} from "react-icons/fa";
import data from "../assets/data";
import "../styles/cardDetails.css";
import Layout from "../components/Layout";
import BookingModal from "../components/BookingModal";

const CardDetails = () => {
  const { id } = useParams();
  const card = data.find((item) => item.id === parseInt(id));
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!card) {
    return <p className="not-found">Card not found!</p>;
  }

  const shortDescription = card.description.split(".")[0] + ".";

  const toggleSave = () => {
    setSaved(!saved);
  };

  return (
    <div>
      <Layout />
      <div className="card-details">
        <div className="header">
          <h2 className="title">{card.title}</h2>
          <div className="save-icon" onClick={toggleSave}>
            <FaHeart className={saved ? "heart-icon saved" : "heart-icon"} />
            <span>{saved ? "Saved" : "Save"}</span>
          </div>
        </div>
        <p className="short-description">{shortDescription}</p>
        <div className="property-info">
          <p>
            <FaMapMarkerAlt className="icon" /> {card.location}
          </p>
          <p>
            <FaBed className="icon" /> {card.bedrooms} Bedrooms
          </p>
          <p>
            <strong>Price:</strong> ${card.price}/month
          </p>
        </div>
        <div className="offers">
          {card.offers.includes("WiFi") && (
            <p>
              <FaWifi className="icon" /> WiFi
            </p>
          )}
          {card.offers.includes("Gym") && (
            <p>
              <FaDumbbell className="icon" /> Gym
            </p>
          )}
          {card.offers.includes("Smart TV") && (
            <p>
              <FaTv className="icon" /> Smart TV
            </p>
          )}
          {card.offers.includes("Breakfast Included") && (
            <p>
              <FaCoffee className="icon" /> Breakfast Included
            </p>
          )}
          {card.offers.includes("Private Garden") && (
            <p>
              <FaTree className="icon" /> Private Garden
            </p>
          )}
          {card.offers.includes("Parking") && (
            <p>
              <FaCar className="icon" /> Parking
            </p>
          )}
        </div>
        <div className="image-gallery">
          {card.imageUrls.length > 0 && (
            <>
              <img
                className="big-image"
                src={card.imageUrls[0]}
                alt="Big View"
              />
              <div className="small-images">
                {card.imageUrls.slice(1, 4).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Small View ${index}`}
                    className="small-image"
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="booking-section">
          <button
            className="booking-button"
            onClick={() => setIsModalOpen(true)}
          >
            Book Now
          </button>
        </div>
      </div>
      {isModalOpen && (
        <BookingModal cardId={id} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CardDetails;
