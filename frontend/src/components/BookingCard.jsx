import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/bookingCard.css";
import BaseUrl from "../utils/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingCard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      try {
        console.log("Fetching pending bookings...");
        const response = await axios.get(`${BaseUrl}/booking/pending`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Bookings response:", response.data);
        if (Array.isArray(response.data.data)) {
          setBookings(response.data.data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
        toast.error("Failed to fetch pending bookings.");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-container">
      {bookings.map((booking) => (
        <SingleBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

const SingleBookingCard = ({ booking }) => {
  const { id, propertyId, renterId, checkInDate, checkOutDate } = booking;
  const [property, setProperty] = useState(null);
  const [renter, setRenter] = useState(null);
  const token = localStorage.getItem("token");
  let userId = null;

  console.log("Booking from pending:", booking);

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));

      if (decodedPayload?.id) {
        userId = decodedPayload.id;
        console.log("User ID from token:", userId);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    console.log("Fetching property details for propertyId:", propertyId);
    axios
      .get(`${BaseUrl}/properties/${propertyId}`)
      .then((res) => {
        console.log("Property details:", res.data.property);
        setProperty(res.data);
      })
      .catch((err) => console.error("Error fetching property:", err));

    console.log("Fetching renter details for renterId:", renterId);
    axios
      .get(`${BaseUrl}/users/${renterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Renter details:", res.data);
        setRenter(res.data);
      })
      .catch((err) => console.error("Error fetching renter:", err));
  }, [propertyId, renterId, token]);

  const getNights = () => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.max(
      1,
      Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    );
  };

  const handleSubmit = async () => {
    const bookingData = {
      propertyId,
      renterId: userId,
      checkInDate,
      checkOutDate,
    };
    console.log("Booking Data:", bookingData);

    try {
      console.log("id of booking", id);
      const response = await axios.put(
        `${BaseUrl}/booking/${id}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking confirmed:", response.data);
      toast.success("Booking confirmed successfully!");
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to confirm booking.");
    }
  };

  const cancelBooking = async () => {
    try {
      console.log("Cancelling booking id:", id);
      const response = await axios.put(`${BaseUrl}/booking/${id}/cancel`,
        {},
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Booking cancelled:", response.data);
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <div className="booking-card">
      <img
        className="booking-card-image"
        src={property ? property.property.imageUrls[0] : ""}
        alt={property ? property.property.title : "Loading..."}
      />

      <div className="booking-card-content">
        <h2 className="booking-title">
          {property ? property.property.title : "Loading..."}
        </h2>
        <p className="booking-info">
          Renter: {renter ? renter.user.name : "Loading..."}
        </p>
        <p className="booking-info">
          {new Date(checkInDate).toLocaleDateString()} →{" "}
          {new Date(checkOutDate).toLocaleDateString()}
        </p>
        <p className="booking-info">{getNights()} nights</p>

        <div className="booking-actions">
          <button className="cancel-btn" onClick={handleSubmit}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={cancelBooking}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
