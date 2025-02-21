import React, { useState } from "react";
import "../styles/modal.css";

const BookingModal = ({ cardId, onClose }) => {
  const renterId = localStorage.getItem("token"); // Replace with actual token extraction logic
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      propertyId: cardId,
      renterId,
      checkInDate,
      checkOutDate,
      guests,
    };
    console.log("Booking Data:", bookingData);
    // Handle API call here

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
