import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../index.css"; // if your fade-in/animations are here

const BookingModal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(searchParams.get("service") || "");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await api.post(
        "/bookings",
        { service, price: 0, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Booking created successfully!");
      setDescription("");
    } catch (err) {
      console.error("Booking error:", err);
      setMessage(err.response?.data?.message || "Failed to create booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page fade-in">
      <div className="modal-content slide-in">
        <span className="close" onClick={() => navigate("/")}>
          &times;
        </span>

        <h2><u>Book a Service</u></h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={user?.name || ""}
            readOnly
            placeholder="Full Name"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            placeholder="Email"
          />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            style={{
              borderRadius: "20px",
              border: "rgb(248, 244, 244)",
              margin: "2px",
            }}
          >
            <option value="">Select Service</option>
            <option>Web Development</option>
            <option>Academic Writing</option>
            <option>Digital Marketing</option>
          </select>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide more information about your request..."
            required
          />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && <p className="info">{message}</p>}
      </div>
    </div>
  );
};

export default BookingModal;
