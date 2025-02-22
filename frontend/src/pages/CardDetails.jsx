import React, { useState,useEffect } from "react";
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
import "../styles/cardDetails.css";
import Layout from "../components/Layout";
import BookingModal from "../components/BookingModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BaseUrl from "../utils/config";
import { Spin, Flex } from "antd";
import UpdateModal from "../components/UpdateModal";

const CardDetails = () => {
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  

  const handleFetchCard = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseUrl}/properties/${id}`);
      console.log("Response from carddetails:", response);
      setCard(response.data.property);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch property details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      handleFetchCard(id);
    }
  }, [id]);


  if (!card) {
    return <p className="not-found">Card not found!</p>;
  }

  const shortDescription = card.description.split(".")[0] + ".";

  const toggleSave = () => {
    setSaved(!saved);
  };

  // Retrieve and decode token to get the role
  let role = "";
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));

      if (decodedPayload && decodedPayload.role) {
        role = decodedPayload.role;
        console.log("Role from card details:", role);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this property?"
  );
  if (!confirmDelete) return;
  try {
    console.log("id from deleting card",id);
    console.log("token from deleting card",token);
    const response = await axios.delete(`${BaseUrl}/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    toast.success("Property deleted successfully!");
    setTimeout(() => navigate("/hosts"));
  } catch (error) {
    console.error("Error deleting property:", error);
    toast.error("Failed to delete property.");
  } 
};

const handleUpdate = async () => {
  setIsUpdateModal(true);


};

const handleBookingClick = () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    window.location.href = "/login"; 
  } else {
    setIsModalOpen(true); 
  }
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
            <strong>Price:</strong> ${card.price}/night
          </p>
        </div>
        <div className="offers">
          {card.offers.includes("Wifi") && (
            <p>
              <FaWifi className="icon" /> WiFi
            </p>
          )}
          {card.offers.includes("Gym") && (
            <p>
              <FaDumbbell className="icon" /> Gym
            </p>
          )}
          {card.offers.includes("Tv") && (
            <p>
              <FaTv className="icon" /> Smart TV
            </p>
          )}
          {card.offers.includes("Breakfast") && (
            <p>
              <FaCoffee className="icon" /> Breakfast Included
            </p>
          )}
          {card.offers.includes("Garden") && (
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

        {/* Conditional Button Rendering Based on Role */}
        <div className="booking-section">
          {role === "Hosts" ? (
            <>
              <div className="update-btn">
                <span>Update your Property:</span>
                <button
                  className="update-button"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
                {isUpdateModal && (
                  <UpdateModal
                    onClose={() => setIsUpdateModal(false)}
                    property={card}
                    id={id}
                  />
                )}
              </div>

              <div className="delete-btn">
                <span>Delete your Property:</span>
                <button
                  className="delete-button"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <Flex justify="center" align="center">
                      <Spin size="large" />
                    </Flex>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </>
          ) : (
            <button
              className="booking-button"
              onClick={() => handleBookingClick()}
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <BookingModal cardId={id} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CardDetails;
