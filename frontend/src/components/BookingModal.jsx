import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/modal.css";
import BaseUrl from "../utils/config";

const BookingModal = ({ onClose }) => {
  const { id: propertyId } = useParams();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  let renterId = "";
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));

      if (decodedPayload && decodedPayload.id) {
        renterId = decodedPayload.id;
        console.log("renterId from card details:", renterId);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      propertyId,
      renterId,
      checkInDate,
      checkOutDate,
    };
    console.log("Booking Data:", bookingData);

    try {
      const response = await axios.post(`${BaseUrl}/booking`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from booking:", response);
      toast.success("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking.");
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book Your Stay</h2>
        <form onSubmit={handleSubmit}>
          <label>Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />

          <label>Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />

          <label>Guests:</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          />

          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
