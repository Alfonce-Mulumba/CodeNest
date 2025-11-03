import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const res = await api.get("/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (!user) {
    return (
      <div className="auth-container">
        <h2>You’re not logged in</h2>
        <button className="btn" onClick={() => (window.location.href = "/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">My Profile</h2>

      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <hr className="divider" />

      <h3 className="bookings-heading">My Bookings</h3>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.serviceTitle || "—"}</td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>{b.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn logout-btn" onClick={logout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
